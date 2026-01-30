<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Http\Requests\Front\ShopRequest;
use App\Models\Shop;
use Illuminate\Support\Facades\Log;

class ShopController extends Controller
{
    public function store(ShopRequest $request)
    {
        $validated = $request->validated();

        return back()->with('success', 'Boutique créée avec succès !');
    }

    public function update(ShopRequest $request, Shop $shop)
    {
        $validated = $request->validated();

        return back()->with('success', 'Boutique mise à jour avec succès.');
    }

    public function destroy(Shop $shop)
    {
        try {
            $shop->delete();

            return back()->with('success', 'Boutique supprimée avec succès.');
        } catch (\Throwable $e) {
            Log::error('Shop deletion failed', [
                'shop_id' => $shop->id,
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Une erreur est survenue lors de la suppression.');
        }
    }
}
