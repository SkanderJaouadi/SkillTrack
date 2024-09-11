<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Selected_kpis;
use App\Models\Evaluations;
use App\Models\Cours;
use App\Models\Rattrapage;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon; 

class DashboardController extends Controller
{
    public function index()
    {
        $selected_kpis = Selected_kpis::with(['kpi', 'cour'])
        ->where('etudiant_id', auth()->user()->etudiant_id)
        ->get();

    $kpiData = [];
    $evolutions = Evaluations::with('cour') 
        ->where('date_evaluation', '>', now())
        ->get();
         
        foreach ($selected_kpis as $selected_kpi) {
            switch ($selected_kpi->kpi->nom_kpi) {
                case 'Student Success Rate':
                    $selected_kpi->value = $this->calculateSuccessRate($selected_kpi->cour_id);
                    break;
                case 'Retention Rate':
                    $selected_kpi->value = $this->calculateRetentionRate($selected_kpi->cour_id);
                    break;
                case 'Abandonment Rate':
                    $selected_kpi->value = $this->calculateDropoutRate($selected_kpi->cour_id);
                    break;
                case 'Absences':
                    $selected_kpi->value = $this->calculateAbsence(auth()->user()->etudiant_id, $selected_kpi->cour_id);
                    break;
                case 'Average Ratings':
                    $selected_kpi->value = $this->calculateRating($selected_kpi->cour_id);
                    break;
                case 'Student Satisfaction Rate':
                    $selected_kpi->value = $this->calculateSatisfactionRate($selected_kpi->cour_id);
                    break;
                case 'Student Motivation Index':
                    $selected_kpi->value = $this->calculateMotivation(auth()->user()->etudiant_id, $selected_kpi->cour_id);
                    break;
                case 'Late Submission Rate':
                    $selected_kpi->value = $this->calculateMissedDeadline(auth()->user()->etudiant_id);
                    break;
                case 'Class Participation Rate':
                    $selected_kpi->value = $this->calculateClassParticipation($selected_kpi->cour_id);
                    break;     
                case 'Average Study Time per Week':
                    $selected_kpi->value = $this->calculateWeeklyStudyHours($selected_kpi->cour_id);
                    break; 
                case 'Online Success Rate':
                    $selected_kpi->value = $this->calculateOnlineSuccessRate($selected_kpi->cour_id);
                    break; 
                case 'Student Progress Rate':
                    $selected_kpi->value = $this->getCourseCompletionRate($selected_kpi->cour_id);
                    break;
                case 'Student Performance Index':
                    $selected_kpi->value = $this->getStudentPerformance(auth()->user()->etudiant_id,$selected_kpi->cour_id);
                    break; 
                default:
                    $selected_kpi->value = null; 
            }
            $kpiData[$selected_kpi->kpi->nom_kpi] = $selected_kpi->value;
        }
        
        $courses = Cours::all()->pluck('nom_cour', 'id');
        $studentId = auth()->id();

        $rattrapages = Rattrapage::select('rattrapages.*', 'cours.nom_cour')
    ->join('cours', 'rattrapages.cour_id', '=', 'cours.id')
    ->where(function ($query) {
        $query->where('rattrapages.is_declined', '!=', 0)
              ->orWhere('rattrapages.is_accepted', '!=', 0);
    })
    ->orderBy('rattrapages.updated_at', 'desc')
    ->take(4)
    ->get();




    return Inertia::render('Dashboard', [
        'selected_kpis' => $selected_kpis,
        'kpi_data' => $kpiData,
        'evaluation' => $evolutions,
        'courses' => $courses, 
        'rattrapages'=>$rattrapages
    ]);
    }

    private function calculateSuccessRate($courId)
    {
        $studentsTermine = DB::table('inscriptions')
            ->where('cour_id', $courId)
            ->where('etat', 'Termine')
            ->count();

        $totalStudents = DB::table('inscriptions')
            ->where('cour_id', $courId)
            ->count();

        if ($totalStudents === 0) {
            return 0; 
        }

        return ($studentsTermine * 100.0 / $totalStudents);
    }

    private function calculateRetentionRate($courId)
    {
        $studentsTermine = DB::table('inscriptions')
            ->where('cour_id', $courId)
            ->where('etat', 'Actif')
            ->count();

        $totalStudents = DB::table('inscriptions')
            ->where('cour_id', $courId)
            ->count();

        if ($totalStudents === 0) {
            return 0; 
        }

        return ($studentsTermine * 100.0 / $totalStudents);
    }

    private function calculateDropoutRate($courId)
    {
        $studentsTermine = DB::table('inscriptions')
            ->where('cour_id', $courId)
            ->where('etat', 'Abandonne')
            ->count();

        $totalStudents = DB::table('inscriptions')
            ->where('cour_id', $courId)
            ->count();

        if ($totalStudents === 0) {
            return 0; 
        }

        return ($studentsTermine * 100.0 / $totalStudents);
    }

    private function calculateAbsence($etudiantId, $courId)
    {
        $totalAbsences = DB::table('absences')
            ->where('etudiant_id', $etudiantId)
            ->where('cour_id', $courId)
            ->count();

        return $totalAbsences;
    }

    private function calculateRating($courId)
    {
        $averageGrade = DB::table('cour_details')
            ->where('cour_id', $courId)
            ->avg('grade');

        return $averageGrade;
    }

    private function calculateSatisfactionRate($courseId)
    {
        $excellentCount = DB::table('rates')
            ->where('Rate', 'excellent')
            ->where('cour_id', $courseId)
            ->count();

        $totalRatings = DB::table('rates')
            ->where('cour_id', $courseId)
            ->count();

        if ($totalRatings === 0) {
            return 0;
        }

        return ($excellentCount * 100.0) / $totalRatings;
    }

    private function calculateMotivation($etudiantId, $courId)
    {
        $excellentCount = DB::table('rates')
            ->where('etudiant_id', $etudiantId)
            ->where('Rate', 'excellent')
            ->where('cour_id', $courId)
            ->count();

        $totalRatings = DB::table('rates')
            ->where('etudiant_id', $etudiantId)
            ->where('cour_id', $courId)
            ->count();

        if ($totalRatings === 0) {
            return 0; 
        }

        return ($excellentCount * 100.0) / $totalRatings;
    }

    private function calculateMissedDeadline($etudiantId)
    {
        $missedCount = DB::table('cour_details')
            ->where('etudiant_id', $etudiantId)
            ->where('status_deadline', 'missed')
            ->count();

        $totalDeadlines = DB::table('cour_details')
            ->where('etudiant_id', $etudiantId)
            ->count();

        if ($totalDeadlines === 0) {
            return 0; 
        }

        return ($missedCount * 100.0) / $totalDeadlines;
    }

    private function calculateClassParticipation($courId)
    {
        $faceToFaceCount = DB::table('cour_details')
            ->where('cour_id', $courId)
            ->where('course_attendance', 'face_to_face')
            ->count();

        $totalStudents = DB::table('cour_details')
            ->where('cour_id', $courId)
            ->count();

        if ($totalStudents === 0) {
            return 0; 
        }

        return ($faceToFaceCount * 100.0) / $totalStudents;
    }

    

    private function calculateWeeklyStudyHours($courId)
    {
        $result = DB::table('cours')
        ->where('id', $courId)
        ->value('duree_semaines');

    
    $totalEtudiant = DB::table('etudiants')
        ->count();

    
    if ($totalEtudiant > 0 && is_numeric($result)) {
        return $result / $totalEtudiant;
    }

   
    return 0; 
    }
    


public function calculateOnlineSuccessRate($courseId)
{
    
    $passedCount = DB::table('cour_details')
        ->where('cour_id', $courseId)
        ->where('course_attendance', 'online')
        ->where('course_status', 'passed')
        ->count();

    
    $totalCount = DB::table('cour_details')
        ->where('cour_id', $courseId)
        ->where('course_attendance', 'online')
        ->count();

   
    if ($totalCount === 0) {
        return 0; 
    }

    return ($passedCount * 100.0) / $totalCount;
}


public function getCourseCompletionRate($courseId)
{
    
    $completedSteps = DB::table('cour_details')
        ->where('cour_id', $courseId)
        ->sum('completed_steps');

    $totalSteps = DB::table('cour_details')
        ->where('cour_id', $courseId)
        ->sum('total_steps');

    
    if ($totalSteps === 0) {
        return 0; 
    }

    return ($completedSteps * 100.0) / $totalSteps;
}

public function getStudentPerformance($studentId,$courId)
{
    
    $totalNotes = DB::table('performances')
        ->where('etudiant_id', $studentId)
        ->where('cour_id', $courId)
        ->sum('note');

    $performanceCount = DB::table('etudiants')
        ->count();

    
    if ($performanceCount === 0) {
        return 0; 
    }

    return ($totalNotes * 1.0) / $performanceCount;
}

    public function create() {}

    public function store(Request $request) {}

    public function show(Etudiants $etudiants) {}

    public function edit(Etudiants $etudiants) {}

    public function update(Request $request, Etudiants $etudiants) {}

    public function destroy(Request $request)
    {
        Selected_kpis::where('etudiant_id', auth()->user()->etudiant_id)->delete();

        return redirect()->back()->with('success', 'KPIs have been successfully reset!');
    }
}
