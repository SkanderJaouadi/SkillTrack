<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Selected_kpis extends Model
{
    use HasFactory;

    protected $table = 'kpis_selected'; 

    protected $fillable = [
        'etudiant_id',
        'cour_id',
        'k_p_is_id',
    ];

    /**
     * Get the etudiant associated with the selected KPI.
     */
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');
    }

    /**
     * Get the course associated with the selected KPI.
     */
    public function cour()
    {
        return $this->belongsTo(Cours::class, 'cour_id');
    }

    /**
     * Get the KPI associated with the selection.
     */
    public function kpi()
    {
        return $this->belongsTo(KPIs::class, 'k_p_is_id');
    }
}
