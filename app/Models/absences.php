<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class absences extends Model
{
    use HasFactory;

    protected $fillable = [
        'date_absence',
        'justifiee',
    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');
    }

    public function cour()
    {
        return $this->belongsTo(cours::class, 'cour_id');
    }
}
