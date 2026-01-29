<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StockMovementResource extends JsonResource
{
    public function toArray($request): array
    {
        if ($this->resource === null) {
            return [];
        }

        return [
            'id' => $this->id,
            'quantity' => $this->quantity,
            'type' => $this->type,
            'stock_before' => $this->stock_before,
            'stock_after' => $this->stock_after,
            'note' => $this->note,
            'created_at' => $this->created_at,

            // Relationships
            'user' => $this->whenLoaded('user', fn() => [
                'id' => $this->user->id,
                'firstname' => $this->user->firstname,
                'lastname' => $this->user->lastname,
                'fullname' => $this->user->fullname,
            ]),

            'product' => $this->whenLoaded('product', fn() => [
                'id' => $this->product->id,
                'name' => $this->product->name,
                'slug' => $this->product->slug,
                'default_image_id' => $this->product->default_image_id,
                'default_image' => $this->product->default_image_id
                    ? $this->product->getMedia('images')->where('id', $this->product->default_image_id)->first()?->getUrl()
                    : null,
                'images' => $this->product->getMedia('images')->map(function ($media) {
                    return [
                        'id' => $media->id,
                        'url' => $media->getUrl(),
                    ];
                }),
            ]),

            'variant' => $this->whenLoaded('variant', fn() => $this->variant ? [
                'id' => $this->variant->id,
                'sku' => $this->variant->sku,
                'name' => $this->variant->options
                    ->map(function ($opt) {
                        return $opt->attribute->name . ': ' . $opt->option->name;
                    })
                    ->implode(' / ') ?? 'Default',
            ] : null),

            // Polymorphic Reference Formatting
            'reference' => $this->formatReference(),
        ];
    }

    private function formatReference()
    {
        if (!$this->reference) {
            return null;
        }

        $type = class_basename($this->reference_type); // e.g., "Order"

        return [
            'type' => $type,
            'id' => $this->reference->id,
            'label' => $type === 'Order'
                ? "Commande #{$this->reference->id}"
                : "{$type} #{$this->reference->id}",
            // Helper for frontend routing
            'route_name' => $type === 'Order' ? 'admin.orders.show' : null,
        ];
    }
}
