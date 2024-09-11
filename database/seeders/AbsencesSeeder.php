<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Carbon\Carbon;

class AbsencesSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $etudiantIds = DB::table('etudiants')->pluck('id')->toArray();
        $courIds = DB::table('cours')->pluck('id')->toArray();

        foreach (range(1, 10) as $index) {
            DB::table('absences')->insert([
                'etudiant_id' => $faker->randomElement($etudiantIds),
                'cour_id' => $faker->randomElement($courIds),
                'date_absence' => $faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
                'justifiee' => $faker->boolean,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}

