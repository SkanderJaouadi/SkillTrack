<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Carbon\Carbon;

class InscriptionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        // Assuming there are 10 students and 5 courses in the database
        for ($i = 0; $i < 10; $i++) {
            DB::table('inscriptions')->insert([
                'etudiant_id' => $faker->numberBetween(1, 15),  // Adjust based on your etudiants table IDs
                'cour_id' => $faker->numberBetween(1, 6),       // Adjust based on your cours table IDs
                'date_inscription' => $faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
                'etat' => $faker->randomElement(['Actif', 'Termine', 'Abandonne']),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
