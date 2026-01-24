<?php

namespace App\Enums;

enum CategoryType: string
{
    case PRODUCTS = 'products';
    case POSTS = 'posts';
    case EVENTS = 'events';
    case SHOPS = 'shops';
    case EMPLOYMENTS = 'employments';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public function label(): string
    {
        return match ($this) {
            self::PRODUCTS => __('Produits'),
            self::POSTS => __('Articles'),
            self::EVENTS => __('Évènements'),
            self::SHOPS => __('Boutiques'),
            self::EMPLOYMENTS => __('Emplois'),
        };
    }
}
