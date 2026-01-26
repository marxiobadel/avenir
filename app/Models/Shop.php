<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sitemap\Contracts\Sitemapable;
use Spatie\Sitemap\Tags\Url;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Shop extends Model implements HasMedia, Sitemapable
{
    use HasFactory, HasSlug, SoftDeletes, InteractsWithMedia;

    protected $guarded = ['id'];

    protected $casts = [
        'social_links' => 'array',    // Transforme le JSON en tableau PHP automatiquement
        'opening_hours' => 'array',   // Idem pour les horaires
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'rating_cache' => 'integer',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()->generateSlugsFrom('name')->saveSlugsTo('slug');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('logo')->singleFile();
        $this->addMediaCollection('banner')->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('300x300')->width(300)->height(300)->sharpen(10);
    }

    public function logoUrl(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getFirstMediaUrl('logo', '300x300')
        );
    }

    public function bannerUrl(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getFirstMediaUrl('banner')
        );
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function toSitemapTag(): Url|string|array
    {
        return Url::create(route('shops.show', [$this->slug]))
            ->setLastModificationDate(Carbon::create($this->updated_at))
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
            ->setPriority(0.8);
    }
}
