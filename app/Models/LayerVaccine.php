<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LayerVaccine extends Model
{
    use HasFactory;

    protected $table = 'layer_vaccines';

    protected $fillable = [
        'disease_en',
        'vaccine_type_en',
        'name_mm',
        'target_stages',
    ];

    
}
