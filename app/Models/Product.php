<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'name_en',
        'name_mm',
        'composition',
        'indications_chicken',
        'indications_pig',
        'indications_cow',
        'dosage_chicken',
        'dosage_pig',
        'dosage_cow',
        'packaging',
        'storage',
        'special_features',
        'image',
        'status',
    ];

    protected $casts = [
        'status' => 'string',
    ];
}
