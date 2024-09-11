<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Educators;

class EducatorsSeeder extends Seeder
{
    /**
     * Seed the educators table.
     *
     * @return void
     */
    public function run()
    {
        Educators::factory()->count(3)->create();
    }
}
