<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KPIs extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_kpi',
        'description',
        'formule',
        'valeur',
    ];

    public function kpiSelections()
    {
        return $this->hasMany(Selected_kpis::class, 'k_p_is_id');
    }
}
