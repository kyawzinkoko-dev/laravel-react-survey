<?php

namespace App\Http\Controllers;

use App\Http\Resources\DashboardResource;
use App\Http\Resources\SurveyAnswerResource;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use DB;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        //total survye count
        $total = Survey::where('user_id', $user->id)->count();
        //latest survey 
        $latestSurvey = Survey::where('user_id', $user->id)
            ->latest('created_at')
            ->first();
        //total number of answers
        $totalAnswer = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->count();

        $latestFiveAnswers = SurveyAnswer::query()
            ->join('surveys', 'surveys.id', '=', 'survey_answers.survey_id')
            ->where('surveys.user_id', $user->id)
            ->orderBy('end_date', 'desc')
            ->limit(5)
            ->select('survey_answers.*','image')
            ->get();
            return [
             'total'=>$total,
             'latestSurvey' =>$latestSurvey ? new DashboardResource($latestSurvey) : null,
             'totalAnswer'=>$totalAnswer,
            'latestFiveAnswer'=>SurveyAnswerResource::collection($latestFiveAnswers)
        ];
    }
}
