<?php

namespace App\Http\Controllers;
use App\Enums\QuestionTypeEnum;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Models\SurveyQuestion;
use Arr;
use File;
use Illuminate\Validation\Rules\Enum;
use Request;
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
        return SurveyResource::collection(Survey::where('user_id', $user->id)->orderBy('created_at', 'desc')->paginate(10));

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
        dd('here');
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
        $survey->update($data);
        $existingIds = $survey->question()->pluck('id');
        $newIds = Arr::pluck($data['question'], 'id');
        $toDelte = array_diff($existingIds, $newIds);
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
            'survey_id' => 'exists:App\Models\Survey,id'
        ]);
        SurveyQuestion::create($validator->validated());
    }
    private function updateQuestion(SurveyQuestion $question, $data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
            $validator = Validator::make($data, [
                'id' => 'App\Models\SurveyQuestion,id',
                'question' => 'required|string',
                'description' => 'nullable|string',
                'data' => 'present',
            ]);
            $question->update($validator->validated());
        }
    }
}
