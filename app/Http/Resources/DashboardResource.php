<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class DashboardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
      return [
        'id'=>$this->id,
        'image'=>$this->image ? URL::to($this->image) : null,
        'title'=>$this->title,
        'slug'=>$this->slug,
        'status'=>!!$this->status,
        'created_at'=>$this->created_at->format('Y-m-d H:i:s'),
        'expire_date'=>$this->expire_date,
        'answers'=>$this->answers()->count(),
        'questions'=>$this->questions()->count()
      ];
    }
}
