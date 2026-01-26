<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shops', function (Blueprint $table) {
            // Identification & SEO
            $table->id();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade'); // Propriétaire de la boutique
            $table->string('name');
            $table->string('slug')->unique(); // Unique est crucial pour le SEO
            $table->text('slogan')->nullable();
            $table->longText('description')->nullable();

            // Contact & Réseaux Sociaux
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('website_url')->nullable();
            $table->json('social_links')->nullable(); // Pour stocker Facebook, Instagram, etc.

            // Localisation (Précision améliorée)
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();

            // Paramètres de la boutique
            $table->boolean('is_featured')->default(false); // Mise en avant sur la home
            $table->boolean('is_active')->default(true);   // Pour suspendre une boutique rapidement
            $table->enum('status', ['draft', 'published'])->default('draft');

            // Horaires & Avis (Meta-données)
            $table->json('opening_hours')->nullable(); // Structure flexible pour les horaires
            $table->unsignedInteger('rating_cache')->default(0); // Cache de la note moyenne pour la performance

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shops');
    }
};
