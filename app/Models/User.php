<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\ResetPasswordNotification;
use App\Notifications\VerifyEmailNotification;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements HasMedia
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasRoles, Notifiable, TwoFactorAuthenticatable, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('profile')->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('300x300')->width(300)->height(300)->sharpen(10);
    }

    public function avatarUrl(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getFirstMediaUrl('profile', '300x300')
        );
    }

    public function fullname(): Attribute
    {
        return new Attribute(
            get: fn() => sprintf('%s %s', $this->lastname, $this->firstname)
        );
    }

    public function password(): Attribute
    {
        return new Attribute(
            set: fn($value) => bcrypt($value)
        );
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmailNotification());
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function shops()
    {
        return $this->belongsToMany(Shop::class, 'shop_user')
            ->using(ShopUser::class) // Indispensable pour utiliser les rôles sur le pivot
            ->withPivot('id')        // Requis par Spatie pour identifier le modèle pivot
            ->withTimestamps();
    }

    public function hasShopRole(Shop $shop, string $role): bool
    {
        // On cherche le lien dans la table pivot
        $shopUser = ShopUser::where('user_id', '=', $this->id)
            ->where('shop_id', '=', $shop->id)
            ->first();

        // On vérifie si ce lien possède le rôle
        return $shopUser ? $shopUser->hasRole($role) : false;
    }

    public function getShopRoleNames(Shop|int $shop): Collection
    {
        $shopId = $shop instanceof Shop ? $shop->id : $shop;

        // On récupère l'instance pivot (ShopUser) pour cette boutique
        $shopUser = ShopUser::where('user_id', '=', $this->id)
            ->where('shop_id', '=', $shopId)
            ->first();

        // Si le lien existe, on utilise getRoleNames() fourni par Spatie sur le pivot
        return $shopUser ? $shopUser->getRoleNames() : collect();
    }

    // Résultat : ["Boulangerie Akwa" => ["admin"], "Garage Yaoundé" => ["employee"]]
    public function getAllShopsRoles(): Collection
    {
        return ShopUser::where('user_id', '=', $this->id)
            ->with('shop', 'roles')
            ->get()
            ->mapWithKeys(function ($shopUser) {
                return [$shopUser->shop->name => $shopUser->getRoleNames()];
            });
    }
}
