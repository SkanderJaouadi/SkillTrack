<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cours extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom-cour',
        'code',
        'credits',
        'duree_semaines' ,
        'niveau' ,
    ];

    public function inscription()
    {
        return $this->hasMany(Inscriptions::class, 'cour_id');
    }
    public function absence()
    {
        return $this->hasMany(Absneces::class, 'cour_id');
    }
    public function evaluation()
    {
        return $this->hasMany(Evaluations::class, 'cour_id');
    }
    public function courDetails()
    {
        return $this->hasMany(CourDetail::class);
    }
    public function rates()
    {
        return $this->hasMany(Rate::class);
    }
    public function kpiSelections()
    {
        return $this->hasMany(Selected_kpis::class, 'cour_id');
    }

    public function rattrapages()
{
    return $this->hasMany(Rattrapage::class);
}
}
