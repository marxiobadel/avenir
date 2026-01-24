<?php

use App\Enums\CategoryType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('name', 'lastname');
            $table->string('phone')->nullable()->after('email');
            $table->string('firstname')->nullable()->after('lastname');
            $table->string('address')->nullable()->after('phone');
            $table->boolean('is_active')->default(true)->after('password');
        });

        $categoryType = CategoryType::values();

        Schema::create('categories', function (Blueprint $table) use ($categoryType) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->enum('type', $categoryType)->default(reset($categoryType))->change();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });

        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete("SET NULL");
            $table->string('title');
            $table->string('slug');
            $table->longText('description')->nullable();
            $table->string('address');
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
            $table->dateTime('event_date')->nullable();
            $table->integer('total_capacity')->nullable();
            $table->enum('status', ['draft', 'published'])->default('draft'); // Capacité totale de la salle
            $table->timestamps();
        });

        Schema::create('event_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Le rôle : 'admin', 'manager', 'scanner'

            $table->timestamps();

            // Empêche d'ajouter deux fois la même personne au même événement
            $table->unique(['event_id', 'user_id']);
        });

        Schema::create('ticket_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events')->cascadeOnDelete();
            $table->string('name'); // 'VIP', 'Classique'
            $table->float('price');
            $table->integer('quantity_available');
            $table->integer('max_per_purchase')->default(5); // Limite par commande
            $table->dateTime('sale_start')->nullable();
            $table->dateTime('sale_end')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ticket_type_id')->nullable()->constrained('ticket_types')->onDelete("SET NULL");
            $table->string('buyer_name');
            $table->string('buyer_email')->nullable(); // Pour envoyer le PDF
            $table->string('buyer_phone')->nullable();
            $table->string('unique_hash')->unique();
            $table->enum('status', ['pending', 'paid', 'used', 'cancelled'])->default('pending');
            $table->foreignId('scanned_by')->nullable()->constrained('users');
            $table->dateTime('scanned_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
        Schema::dropIfExists('ticket_types');
        Schema::dropIfExists('events');
    }
};
