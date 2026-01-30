<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
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
            'alias' => $this->alias,
            'address' => $this->address,
            'name' => $this->name,
            'phone' => $this->phone,
            'city' => $this->city,
            'street' => $this->street,
            'postal_code' => $this->postal_code,
            'is_default' => $this->is_default,
            'state' => $this->state,
            'user' => $this->whenLoaded('user', function () use ($request) {
                return collect((new UserResource($this->user))->toArray($request))->except([
                    'addresses'
                ]);
            }),
            'country_id' => $this->country_id,
            'country' => new CountryResource($this->whenLoaded('country')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
