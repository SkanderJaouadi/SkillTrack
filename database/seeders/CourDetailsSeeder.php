<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class CourDetailsSeeder extends Seeder
{
    public function run()
    {
        // Fetch some etudiant and cour IDs to use in the seeder
        $etudiantIds = DB::table('etudiants')->pluck('id')->toArray();
        $courIds = DB::table('cours')->pluck('id')->toArray();

        // Insert multiple records
        for ($i = 0; $i < 10; $i++) {
            DB::table('cour_details')->insert([
                'etudiant_id' => $etudiantIds[array_rand($etudiantIds)],
                'cour_id' => $courIds[array_rand($courIds)],
                'course_status' => ['passed', 'retained', 'abandoned'][array_rand(['passed', 'retained', 'abandoned'])],
                'grade' => rand(0, 200) / 10,
                'Study_hours' => rand(10, 50),
                'ressources_id' => Str::random(10),
                'course_attendance' => ['online', 'face_to_face'][array_rand(['online', 'face_to_face'])],
                'completed_steps' => rand(1, 100),
                'total_steps' => 100, // Assuming total_steps is constant
                'assignment_id' => Str::random(10),
                'assignment' => ['opened', 'closed'][array_rand(['opened', 'closed'])],
                'deadline_submission' => Carbon::now()->addDays(rand(1, 30)),
                'status_deadline' => ['submitted', 'missed'][array_rand(['submitted', 'missed'])],
                'activity_id' => Str::random(10),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
