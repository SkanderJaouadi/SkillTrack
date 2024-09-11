<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Etudiant; 

class EtudiantsSeeder extends Seeder
{
    /**
     * Seed the educators table.
     *
     * @return void
     */
    public function run()
    {
        Etudiant::factory()->count(5)->create();
    }
}
