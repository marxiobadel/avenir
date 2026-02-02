<?php

namespace App\Models;

use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    // Vous pouvez ajouter des scopes pour faciliter les requêtes
    public function scopeForShops($query)
    {
        return $query->where('entity_type', '=', 'shop');
    }

    public function scopeForCompanies($query)
    {
        return $query->where('entity_type', '=', 'company');
    }

    public function scopeForEvents($query)
    {
        return $query->where('entity_type', '=', 'event');
    }
}
