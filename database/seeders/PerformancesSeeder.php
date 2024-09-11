<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Carbon\Carbon;

class PerformancesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        // Assuming there are 10 students in the database
        for ($i = 0; $i < 10; $i++) {
            DB::table('performances')->insert([
                'etudiant_id' => $faker->numberBetween(1, 5), // Adjust based on your etudiants table IDs
                'cour_id' => $faker->numberBetween(1, 6),
                'note' => $faker->randomFloat(2, 0, 20),       // Generates a random float number between 0 and 20
                'evoluation_date' => $faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
