<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        if ($this->resource === null) {
            return [];
        }

        return [
            'id' => $this->id,
            'parent_id' => $this->parent_id,
            'parent' => new CategoryResource($this->whenLoaded('parent')),
            'slug' => $this->slug,
            'name' => $this->name,
            'type' => $this->type,
            'products_count' => $this->whenLoaded('products', $this->products->count()),
            'shops_count' => $this->whenLoaded('shops', $this->shops->count()),
            'events_count' => $this->whenLoaded('events', $this->events->count()),
            'cover_url' => $this->cover_url,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
