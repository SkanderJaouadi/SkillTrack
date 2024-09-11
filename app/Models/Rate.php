<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    use HasFactory;

    protected $fillable = [
        'etudiant_id',
        'cour_id',
        'cour_details_id',
        'Rate',
    ];

    /**
     * Get the student associated with this rate.
     */
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    /**
     * Get the course associated with this rate.
     */
    public function cour()
    {
        return $this->belongsTo(Cours::class);
    }
}
