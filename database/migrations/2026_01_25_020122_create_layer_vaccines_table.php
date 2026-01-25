<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('layer_vaccines', function (Blueprint $table) {
            $table->id();
            $table->string('disease_en');
            $table->string('vaccine_type_en')->nullable();
            $table->string('name_mm');
            $table->string('target_stages'); // comma-separated list
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('layer_vaccines');
    }
};
