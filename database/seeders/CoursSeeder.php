<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoursSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cours')->insert([
            [
                'nom_cour' => 'AI',
                'code' => 'CS101',
                'credits' => 3,
                'duree_semaines' => 12,
                'niveau' => 'Debutant',
            ],
            [
                'nom_cour' => 'BigData',
                'code' => 'CS102',
                'credits' => 3,
                'duree_semaines' => 12,
                'niveau' => 'Debutant',
            ],
            [
                'nom_cour' => 'IOT',
                'code' => 'CS103',
                'credits' => 3,
                'duree_semaines' => 12,
                'niveau' => 'Debutant',
            ],
            [
                'nom_cour' => 'Cloud Computing',
                'code' => 'CS104',
                'credits' => 3,
                'duree_semaines' => 12,
                'niveau' => 'Debutant',
            ],
            [
                'nom_cour' => 'DevOps',
                'code' => 'CS105',
                'credits' => 3,
                'duree_semaines' => 12,
                'niveau' => 'Debutant',
            ],
            [
                'nom_cour' => 'Cybersecurity',
                'code' => 'CS106',
                'credits' => 3,
                'duree_semaines' => 12,
                'niveau' => 'Debutant',
            ],
        ]);
    }
}
