<?php

use App\Enums\CategoryType;
use App\Http\Controllers\Front\{
    AddressController,
    IndexController,
    ProfileController,
    ShopController
};
use App\Http\Controllers\SuperAdmin\{
    DashboardController as SuperDashboard,
    UserController as SuperUser,
    CategoryController as SuperCategory
};
use App\Http\Controllers\Admin\{
    DashboardController as AdminDashboard,
    UserController as AdminUser,
    ProductController as AdminProduct,
    StockMovementController as AdminStockMovement
};
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
        ->controller(ProfileController::class)
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('edit', 'edit')->name('edit');
            Route::post('update', 'update')->name('update');
            Route::get('addresses', 'addresses')->name('addresses');
            Route::get('shops', 'shops')->name('shops');
            Route::get('shops/{shop}', 'showShop')->name('shops.show');
            Route::get('events', 'events')->name('events');
            Route::get('events/{event}', 'showEvent')->name('events.show');
            Route::get('password', 'password')->name('password.edit');
        });

    Route::resource('addresses', AddressController::class)->only(['destroy', 'store', 'update']);
    Route::resource('shops', ShopController::class)->except(['create', 'edit']);
    Route::resource('events', ShopController::class)->except(['create', 'edit']);

    Route::prefix('admin')->group(function () {
        Route::redirect('/', '/admin/dashboard', 301);

        Route::name('admin.')->group(function () {
            Route::middleware(['can:access-admin'])->group(function () {
                Route::get('dashboard', [SuperDashboard::class, 'index'])->name('dashboard');
                Route::middleware('role:superadmin')->group(function () {
                    Route::resource('users', SuperUser::class)->except(['destroy', 'show']);
                    Route::post('users/destroy', [SuperUser::class, 'destroy'])->name('users.destroy');
                });
                Route::prefix('{type}')->whereIn('type', CategoryType::values())->group(function () {
                    Route::resource('categories', SuperCategory::class)
                        ->parameters(['' => 'category'])
                        ->only(['index', 'store', 'update']);
                    Route::post('categories/destroy', [SuperCategory::class, 'destroy'])->name('categories.destroy');
                });
            });

            Route::prefix('shop/{shop}')->name('shop.')->group(function () {
                Route::get('dashboard', [AdminDashboard::class, 'index'])->name('dashboard');

                Route::resource('users', AdminUser::class)->except(['destroy', 'show']);
                Route::post('users/destroy', [AdminUser::class, 'destroy'])->name('users.destroy');

                Route::resource('products', AdminProduct::class)->except(['destroy', 'show']);
                Route::post('products/destroy', [AdminProduct::class, 'destroy'])->name('products.destroy');

                Route::prefix('inventory')->name('inventory.')->group(function () {
                    Route::get('movements', [AdminStockMovement::class, 'index'])->name('index');
                    Route::post('adjust', [AdminStockMovement::class, 'store'])->name('store');
                    Route::get('{stockMovement}', [AdminStockMovement::class, 'show'])->name('show');
                });
            });
        });
    });
});

require __DIR__ . '/settings.php';
