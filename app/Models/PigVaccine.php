<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PigVaccine extends Model
{
    use HasFactory;

    protected $table = 'pig_vaccines';

    protected $fillable = [
        'disease_en',
        'vaccine_type_en',
        'name_mm',
        'target_stages',
    ];

    
}


