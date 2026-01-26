<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        // Exemples de catégories pour la marketplace
        'categories' => [
            ['id' => 1, 'name' => 'Mode', 'slug' => 'mode', 'icon' => 'Shirt'],
            ['id' => 2, 'name' => 'Maison', 'slug' => 'maison', 'icon' => 'Home'],
            ['id' => 3, 'name' => 'Artisanat', 'slug' => 'artisanat', 'icon' => 'Palette'],
            ['id' => 4, 'name' => 'Bijoux', 'slug' => 'bijoux', 'icon' => 'Gem'],
            ['id' => 5, 'name' => 'Épicerie', 'slug' => 'epicerie', 'icon' => 'Apple'],
            ['id' => 6, 'name' => 'Enfants', 'slug' => 'enfants', 'icon' => 'Baby'],
        ],
        // Exemples de boutiques certifiées
        'featuredStores' => [
            [
                'id' => 1,
                'name' => 'Atelier de Julie',
                'rating' => 4.9,
                'reviews_count' => 128,
                'image' => 'https://images.unsplash.com/photo-1473187983305-f615310e7daa?w=400&h=300&fit=crop'
            ],
            [
                'id' => 2,
                'name' => 'Eco-Design Store',
                'rating' => 4.7,
                'reviews_count' => 85,
                'image' => 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=400&h=300&fit=crop'
            ],
            [
                'id' => 3,
                'name' => 'L\'Artisan Parisien',
                'rating' => 5.0,
                'reviews_count' => 42,
                'image' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
            ],
        ],
        // Exemples de produits populaires
        'featuredProducts' => [
            ['id' => 1, 'name' => 'Vase en céramique', 'price' => 45.00, 'store' => 'Atelier de Julie'],
            ['id' => 2, 'name' => 'Sac en cuir éthique', 'price' => 120.00, 'store' => 'Eco-Design Store'],
            ['id' => 3, 'name' => 'Bougie parfumée', 'price' => 19.99, 'store' => 'L\'Artisan Parisien'],
            ['id' => 4, 'name' => 'Affiche minimaliste', 'price' => 30.00, 'store' => 'Eco-Design Store'],
        ]
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
