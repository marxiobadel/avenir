<?php

namespace App\Observers;

use App\Models\Role;
use App\Models\Shop;
use App\Models\ShopUser;

class ShopObserver
{
    public function creating(Shop $shop): void
    {
        if (auth()->check()) {
            $shop->created_by = auth()->id();
        }
    }

    public function created(Shop $shop): void
    {
        // 1. Définition des rôles de base pour le type 'shop'
        $roleNames = ['admin', 'manager', 'employee'];
        $shopRoles = [];

        foreach ($roleNames as $name) {
            $shopRoles[$name] = Role::firstOrCreate(
                ['name' => $name, 'entity_type' => 'shop']
            );
        }

        // 2. Création du lien entre l'utilisateur (le créateur) et la boutique
        // On utilise le modèle pivot ShopUser
        $shopUser = ShopUser::create([
            'shop_id' => $shop->id,
            'user_id' => $shop->created_by,
        ]);

        // 3. Assignation du rôle 'admin' (celui du type 'shop') à cet utilisateur
        // IMPORTANT : Le modèle ShopUser doit utiliser le trait HasRoles
        $shopUser->assignRole($shopRoles['admin']);
    }
}
