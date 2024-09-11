<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rattrapage extends Model
{
    use HasFactory;

    protected $fillable = [
        'etudiant_id',
        'cour_id',
        'is_declined',
        'is_accepted',
    ];

    /**
     * Get the etudiant that owns the rattrapage.
     */
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    /**
     * Get the cour associated with the rattrapage.
     */
    public function cour()
    {
        return $this->belongsTo(Cours::class);
    }
}
