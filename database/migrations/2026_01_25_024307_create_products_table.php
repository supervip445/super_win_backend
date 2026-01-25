<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name_en'); // Product name in English
            $table->string('name_mm'); // Product name in Myanmar
            $table->text('composition')->nullable(); // Composition/Ingredients
            $table->text('indications_chicken')->nullable(); // Indications for chicken
            $table->text('indications_pig')->nullable(); // Indications for pig
            $table->text('indications_cow')->nullable(); // Indications for cow/calf
            $table->text('dosage_chicken')->nullable(); // Dosage for chicken
            $table->text('dosage_pig')->nullable(); // Dosage for pig
            $table->text('dosage_cow')->nullable(); // Dosage for cow/calf
            $table->text('packaging')->nullable(); // Packaging information
            $table->text('storage')->nullable(); // Storage instructions
            $table->text('special_features')->nullable(); // Special features/notes
            $table->string('image')->nullable(); // Product image path
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
