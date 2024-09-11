<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Performances extends Model
{
    use HasFactory;

    protected $fillable = [
        'note',
    ];

    public function inscription()
    {
        return $this->belongsTo(Inscriptions::class, 'inscription_id');
    }
}
