<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Carbon\Carbon;
class EvaluationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    
    
    public function run()
    {
        $faker = Faker::create();

        // Assuming there are 5 courses in the database
        for ($i = 0; $i < 10; $i++) {
            DB::table('evaluations')->insert([
                'cour_id' => $faker->numberBetween(1, 6), // Adjust based on your cours table IDs
                'type_evaluation' => $faker->randomElement(['Examan', 'Devoir', 'Projet']),
                'description' => $faker->sentence(10), 
                'date_evaluation' => $faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
                
            ]);
        }
    }
}
