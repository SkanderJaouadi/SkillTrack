<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluations extends Model
{
    use HasFactory;

    protected $fillable = [
        'type_evaluation',
        'description',
        'date_evaluation',
    ];

    public function cour()
    {
        return $this->belongsTo(cours::class, 'cour_id');
    }
}
