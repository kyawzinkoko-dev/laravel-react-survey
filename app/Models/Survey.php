<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Symfony\Component\String\Slugger\SluggerInterface;

class Survey extends Model
{
    use HasFactory, HasSlug;
    protected $fillable = ['title', 'description', 'image', 'expire_date', 'status', 'created_at', 'updated_at', 'user_id'];
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()->generateSlugsFrom('title')->saveSlugsTo('slug');
    }
    public function questions()
    {
        return $this->hasMany(SurveyQuestion::class);
    }
    public function answers():HasMany
    {
        return $this->hasMany(SurveyAnswer::class);
    }
}
