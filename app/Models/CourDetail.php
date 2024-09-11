<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourDetail extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'etudiant_id',
        'cour_id',
        'course_status',
        'grade',
        'Study_hours',
        'ressources_id',
        'course_attendance',
        'copleted_steps',
        'total_steps',
        'assignment_id',
        'assignment',
        'deadline_submission',
        'status_deadline',
        'activity_id',
    ];

    /**
     * Get the student that owns the course detail.
     */
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    /**
     * Get the course that owns the course detail.
     */
    public function cour()
    {
        return $this->belongsTo(Cours::class);
    }
}

