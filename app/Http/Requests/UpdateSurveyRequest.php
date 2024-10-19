<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'=>'required|max:1000|string',
            'image'=>'nullable|string',
            'user_id'=>'exists:users,id',
            'status'=>'required|boolean',
            'description'=>'required|string',
            'expire_date'=>'nullable|date|after:today',
            'questions'=>'array'
        ];
    }
}
