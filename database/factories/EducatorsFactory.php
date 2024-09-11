<?php

namespace Database\Factories;

use App\Models\Educators;
use Illuminate\Database\Eloquent\Factories\Factory;

class EducatorsFactory extends Factory
{
    protected $model = Educators::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
           
        ];
    }
}
