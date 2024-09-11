<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KPIsSeeder extends Seeder
{
    public function run()
    {
        $kpis = [
            ['nom_kpi' => 'Student Success Rate', 'description' => "Pourcentage d'étudiants ayant réussi leurs examens"],
            ['nom_kpi' => 'Retention Rate', 'description' => "Pourcentage d'étudiants restant dans le programme"],
            ['nom_kpi' => 'Abandonment Rate', 'description' => "Pourcentage d'étudiants ayant quitté le programme"],
            ['nom_kpi' => 'Average Ratings', 'description' => "Moyenne des notes obtenues par les étudiants"],
            ['nom_kpi' => 'Student Satisfaction Rate', 'description' => "Satisfaction des étudiants envers les cours"],
            ['nom_kpi' => 'Class Participation Rate', 'description' => "Participation des étudiants en classe"],
            ['nom_kpi' => 'Student Progress Rate', 'description' => "Progression des étudiants à travers le programme"],
            ['nom_kpi' => 'Resource Use Rate', 'description' => "Utilisation des ressources académiques"],
            ['nom_kpi' => 'Average Study Time per Week', 'description' => "Durée moyenne d'étude des étudiants par semaine"],
            ['nom_kpi' => 'Late Submission Rate', 'description' => "Retard dans la soumission des devoirs"],
            ['nom_kpi' => 'Student Motivation Index', 'description' => "Niveau de motivation des étudiants"],
            ['nom_kpi' => 'Student Performance Index', 'description' => "Performance globale des étudiants"],
            ['nom_kpi' => 'Engagement Rate in Activities', 'description' => "Participation dans les activités extrascolaires"],
            ['nom_kpi' => 'Absences', 'description' => "Pourcentage d'absences des étudiants"],
            ['nom_kpi' => 'Online Success Rate', 'description' => "Online course success percentage"],
            
        ];

        DB::table('k_p_is')->insert($kpis);
    }
}

