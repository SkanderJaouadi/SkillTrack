<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'date_naissance',
        'sexe',
        'programme',
        'email',
        'tel',
        'date_inscription',
    ];

    

    public function performances()
    {
        return $this->hasMany(Performances::class, 'etudiant_id');
    }

    public function recommandation()
    {
        return $this->hasMany(Recommandations::class, 'etudiant_id');
    }

    public function absence()
    {
        return $this->hasMany(Absences::class, 'etudiant_id');
    }
    
    
    public function inscriptions()
    {
        return $this->hasMany(Inscriptions::class);
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
        return $this->hasMany(Selected_kpis::class, 'etudiant_id');
    }
    public function rattrapages()
{
    return $this->hasMany(Rattrapage::class);
}

}
