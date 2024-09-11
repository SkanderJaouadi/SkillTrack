<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourDetailsTable extends Migration
{
    public function up()
    {
        Schema::create('cour_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('etudiant_id')->constrained('etudiants')->onDelete('cascade');
            $table->foreignId('cour_id')->constrained('cours')->onDelete('cascade');
            $table->enum('course_status', ['passed', 'retained', 'abandoned']);
            $table->float('grade');
            $table->integer('study_hours');
            $table->string('ressources_id');
            $table->enum('course_attendance', ['online', 'face_to_face']);
            $table->integer('completed_steps');
            $table->integer('total_steps');
            $table->string('assignment_id');
            $table->enum('assignment', ['opened', 'closed']);
            $table->date('deadline_submission');
            $table->enum('status_deadline', ['submitted', 'missed']);
            $table->string('activity_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cour_details');
    }
}
