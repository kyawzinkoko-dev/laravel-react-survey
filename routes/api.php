<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SurveyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);    
    Route::apiResource('survey', SurveyController::class);
    Route::get('/me',[AuthController::class,'me']);
   Route::get('/dashboard',[DashboardController::class,'index']);
});
Route::post('/signup',[AuthController::class,'signup']);
Route::post('/login',[AuthController::class,'login']);
Route::get('/survey/get-by-slug/{survey:slug}',[SurveyController::class,'getBySlug']);
Route::post('/survey/store-answer/{survey:slug}',[SurveyController::class,'storeAnswer']);