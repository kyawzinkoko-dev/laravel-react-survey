<?php

namespace App\Http\Controllers;
use App\Enums\QuestionTypeEnum;
use App\Http\Requests\StoreSurveyAnswerRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
//use Illuminate\Support\Arr;
use App\Models\SurveyQuestionAnswer;
use File;
use Arr;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Str;
use Validator;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $user = $request->user();
        return SurveyResource::collection(
             Survey::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(3));

    }




    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();
        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }
        //dd($data);
        $survey = Survey::create($data);
        //create new questoin 
        foreach ($data['questions'] as $question) {
            $question['survey_id'] = $survey->id;
            $this->createQuestion($question);

        }
        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey, Request $request)
    {
       // dd('here');
        $user = $request->user();
        if ($survey->user_id !== $user->id) {
            return abort(403, 'Unauthorized');
        }
        return new SurveyResource($survey);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Survey $survey)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();
        if (isset($data['image'])) {
            $absolutePath = $this->saveImage($data['image']);
            $data['image'] = $absolutePath;
        }
        if ($survey->image) {
            $relativePath = public_path($survey->image);
            File::delete($relativePath);
        }
        //dd($data);
        $survey->update($data);
        $existingIds = $survey->questions()->pluck('id')->toArray();

        $newIds = Arr::pluck($data['questions'], 'id');
        
        $toDelte = array_diff($existingIds, $newIds);
        //dd($toDelte);   
        $toAdd = array_diff($newIds, $existingIds);
        SurveyQuestion::destroy($toDelte);
        foreach ($data['questions'] as $question) {
            if (in_array($question['id'], $toAdd)) {
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }
            $questionMap = collect($data['questions'])->keyBy('id');
            foreach ($survey->questions as $question) {
                if (isset($questionMap[$question->id])) {
                    $this->updateQuestion($question, $questionMap[$question->id]);
                }
            }
        }
        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey, Request $request)
    {

        $user = $request->user();
        if ($survey->user_id !== $user->id) {
            return abort(403, 'Unauthorized action');
        }
        $survey->delete();
        if ($survey->image) {
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }
        return response('', 204);
    }
    public function saveImage($image)
    {
        if (preg_match('/^data:image\/(\w+);base64/', $image, $type)) {
            //take out base64 uncoded test without mime type 
            $image = substr($image, strpos($image, ',') + 1);
            //get the extansion 
            $type = strtolower($type[1]);
            if (!in_array($type, ['jpg', 'png', 'jpeg', 'gif'])) {
                throw new \Exception('Invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);
            if ($image === false) {
                throw new \Exception('base64_decode fail');
            }
        } else {
            throw new \Exception('did not match the data URI with image data');
        }
        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;

        if (!File::exists($absolutePath)) {
            File::makeDirectory($dir, 075, true);
        }
        file_put_contents($relativePath, $image);
        return $relativePath;
    }
    private function createQuestion($data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }
      
        $validator = Validator::make($data, [
            'question' => 'required|string',
            'type' => ['required', new Enum(QuestionTypeEnum::class) ],//'in:text,textarea,select,radio,checkbox,text'],
            'description' => 'nullable|string',
            'data' => 'present',
            'survey_id' => 'exists:surveys,id'
        ]);
        SurveyQuestion::create($validator->validated());
    }
    private function updateQuestion(SurveyQuestion $question, $data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
            $validator = Validator::make($data, [
                'id' => 'exists:survey_questions,id',
                'question' => 'required|string',
                'type' => ['required', new Enum(QuestionTypeEnum::class) ],
                'description' => 'nullable|string',
                'data' => 'present',
            ]);
            $question->update($validator->validated());
        }
    }

    public function getBySlug(Survey $survey){
        if(!$survey->status){
            return response("",404);
        }
        $now = new \DateTime();
        $expireDate = new \DateTime($survey->expire_date);
        if($now > $expireDate){
            return response("",404);
        }
        return new SurveyResource($survey);
    }
    public function storeAnswer(StoreSurveyAnswerRequest $request,Survey $survey){
        $data = $request->validated();
        $surveyAnswer =SurveyAnswer::create([
            'survey_id'=>$survey->id,
            'start_date'=>date('Y-m-d H:i:s'),
            'end_date'=>date('Y-m-d H:i:s')
        ]);
       // dd($data);
        foreach($data['answers'] as $questionId => $answer){
            $question = SurveyQuestion::where(['id'=>$questionId,'survey_id'=>$survey->id])->get();
            
            if(!$question){
                return response("Invalid question ID {$questionId}" , 400);
            }
            $data=[
                'survey_question_id'=>$questionId,
                'survey_answer_id'=>$surveyAnswer->id,
                'answer'=>is_array($answer) ? json_encode($answer) : $answer
            ];
            $questionAnswer = SurveyQuestionAnswer::create($data);

        }
        return response("",201);
    }
}
