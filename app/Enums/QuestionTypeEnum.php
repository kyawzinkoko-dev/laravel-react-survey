<?php


namespace App\Enums;

enum QuestionTypeEnum: string
{
    case text = 'text';
    case textarea = 'textarea';
    case select = 'select';
    case radio = 'radio';
    case checkbox = 'checkbox';
}
