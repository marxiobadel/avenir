<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckShopRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role)
    {
        $shop = $request->route('shop'); // Laravel injecte ici l'objet Shop grâce au slug

        // Vérification de sécurité au cas où l'objet n'est pas trouvé
        if (!$shop instanceof \App\Models\Shop) {
            abort(404);
        }

        if (!$request->user()->hasShopRole($shop, $role)) {
            abort(403, "Accès refusé pour la boutique : {$shop->name}");
        }

        return $next($request);
    }
}
