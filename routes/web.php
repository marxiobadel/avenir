<?php

use App\Http\Controllers\Front\IndexController;
use App\Http\Controllers\WebhookController;
use Illuminate\Support\Facades\Route;

Route::get('/', [IndexController::class, 'home'])->name('home');
foreach (config('services.frontend_routes') as $route) {
    Route::get($route['uri'], [IndexController::class, $route['action']])->name($route['name']);
}

Route::post('orange/notify', [WebhookController::class, 'orangeMoney'])->name('orange.notify');
Route::post('momo/notify', [WebhookController::class, 'mtnMoney'])->name('mtn.notify');

Route::middleware(['auth'])->group(function () {
    Route::prefix('profile')->name('profile.')
        ->controller(\App\Http\Controllers\Front\ProfileController::class)
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('edit', 'edit')->name('edit');
            Route::post('update', 'update')->name('update');
            Route::get('addresses', 'addresses')->name('addresses');
            Route::get('password', 'password')->name('password.edit');
        });
});

require __DIR__.'/settings.php';
