<?php

namespace Database\Factories;

use App\Models\Etudiant;
use Illuminate\Database\Eloquent\Factories\Factory;

class EtudiantFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Etudiant::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'nom' => $this->faker->lastName,
            'prenom' => $this->faker->firstName,
            'date_naissance' => $this->faker->date('Y-m-d', '2005-12-31'),
            'sexe' => $this->faker->randomElement(['M', 'F']),
            'programme' => $this->faker->randomElement(['Computer Science', 'Engineering', 'Mathematics', 'Biology']),
            'email' => $this->faker->unique()->safeEmail,
            'tel' => $this->faker->phoneNumber,
            'date_inscription' => $this->faker->date(),
        ];
    }
}

