<?php

namespace App\Http\Controllers;

use App\Models\Educators;
use App\Models\Etudiant;
use App\Models\Cours;
use App\Models\Rattrapage;
use App\Models\CourDetail; // Assuming CourDetail model is used for grades
use App\Models\Rate;
use App\Models\Inscriptions;
use App\Http\Requests\StoreEducatorsRequest;
use App\Http\Requests\UpdateEducatorsRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EducatorsController extends Controller
{
    /**
     * Calculate the average rating for a student in a specific course.
     */
    public function calculateAverageRating($courseId)
{
    $average = Rate::where('cour_id', $courseId)
        ->selectRaw('AVG(CASE 
                         WHEN Rate = "bad" THEN 0 
                         WHEN Rate = "good" THEN 50 
                         WHEN Rate = "excellent" THEN 100 
                     END) as average_rating')
        ->value('average_rating');

    return $average ?: 0;
}

    /**
     * Calculate the average grade for a student in a specific course.
     */
    public function calculateStudentAverageGrade($studentId, $courseId)
    {
        
        $grades = CourDetail::where('etudiant_id', $studentId)
            ->where('cour_id', $courseId)
            ->pluck('grade'); 

        
        $totalSum = $grades->sum(); 
        $count = $grades->count();  

        
        $average = $count > 0 ? $totalSum / $count : 0; 

        return $average;
    }

    /**
     * Calculate descriptive grade based on average grade.
     */
    public function calculateDescriptiveGrade($average)
    {
        if ($average < 10) {
            return 'Poor';
        } elseif ($average >= 10 && $average < 13) {
            return 'Medium';
        } elseif ($average >= 13 && $average < 15) {
            return 'Good';
        } else {
            return 'Very Good';
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $selectedCourseId = $request->input('course_id');
    
        
        $studentIds = Inscriptions::where('etat', 'Actif')
            ->where('cour_id', $selectedCourseId)
            ->pluck('etudiant_id');
    
        
        $activeStudents = Etudiant::whereIn('id', $studentIds)
            ->paginate(6);
    
        
        $courses = Cours::all();
    
     
        $rattrapages = Rattrapage::with('etudiant')
            ->where('is_accepted', 0)
            ->where('is_declined', 0)
            ->where('cour_id', $selectedCourseId)
            ->get()
            ->groupBy('cour_id');
        

            $averageRatings = $courses->mapWithKeys(function ($course) {
                return [$course->id => $this->calculateAverageRating($course->id)];
            });
      
        $studentsWithGrades = $activeStudents->map(function ($student) use ($selectedCourseId) {
            $average = $this->calculateStudentAverageGrade($student->id, $selectedCourseId);
            $descriptiveGrade = $this->calculateDescriptiveGrade($average);
            
            
            return [
                'id' => $student->id,
                'name' => $student->nom,
                'prenom' => $student->prenom,
                'sexe'=>$student->sexe,
                'grade' => $descriptiveGrade,
            ];
        });
        
        return Inertia::render('DashbordEnseigant', [
            'userName' => Auth::user()->name,
            'courses' => $courses,
            'students' => $studentsWithGrades, 
            'pagination' => [
                'current_page' => $activeStudents->currentPage(),
                'last_page' => $activeStudents->lastPage(),
                'per_page' => $activeStudents->perPage(),
                'total' => $activeStudents->total(),
            ],
            'rattrapages' => $rattrapages->map(function ($group) {
                return $group->map(function ($rattrapage) {
                    return [
                        'etudiant_id' => $rattrapage->etudiant->id,
                        'name' => $rattrapage->etudiant->nom,
                        'prenom' => $rattrapage->etudiant->prenom,
                    ];
                });
            }),
            'averageRatings' => $averageRatings,
        ]);
        
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function updateRattrapages(Request $request)
    {
        $action = $request->input('action');
        $studentIds = $request->input('studentIds');
        $courseId = $request->input('courseId');

        if ($action === 'accept') {
            Rattrapage::whereIn('etudiant_id', $studentIds)
                ->where('cour_id', $courseId)
                ->update(['is_accepted' => 1]);
        } elseif ($action === 'decline') {
            Rattrapage::whereIn('etudiant_id', $studentIds)
                ->where('cour_id', $courseId)
                ->update(['is_declined' => 1]);
        }

        return redirect()->route('enseignant_dashboard')->with('success', ucfirst($action) . 'd successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Educators $educators)
    {
        //
    }
}
