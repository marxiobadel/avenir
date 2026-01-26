<?php

namespace App\Http\Resources;

use App\Models\Shop;
use Illuminate\Http\Resources\Json\JsonResource;

class ShopResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        /** @var Shop $shop */
        $shop = $this->resource;

        if ($shop === null) {
            return [];
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'slogan' => $this->slogan,
            'description' => $this->description,

            // Propriétaire (On utilise "whenLoaded" pour éviter les problèmes de performance N+1)
            'created_by' => UserResource::make($this->whenLoaded('owner')),

            // Groupe Contact & Social
            'contact' => [
                'email' => $this->email,
                'phone' => $this->phone,
                'website' => $this->website_url,
                'social_links' => $this->social_links, // Déjà casté en array dans le Model
            ],

            // Groupe Localisation
            'location' => [
                'address' => $this->address,
                'city' => $this->city,
                'postal_code' => $this->postal_code,
                'coordinates' => [
                    'latitude' => $this->latitude,
                    'longitude' => $this->longitude,
                ],
            ],

            // Paramètres & Statuts
            'settings' => [
                'is_featured' => (bool) $this->is_featured,
                'is_active' => (bool) $this->is_active,
                'status' => $this->status,
                'rating' => $this->rating_cache,
            ],

            'opening_hours' => $this->opening_hours,

            // Dates
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
