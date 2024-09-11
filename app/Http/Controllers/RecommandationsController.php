<?php

namespace App\Http\Controllers;
use App\Models\Cours;
use App\Models\CourDetail;
use App\Models\Recommandations;
use App\Models\Rattrapage;
use App\Models\Etudiant;
use Inertia\Inertia;
use App\Http\Requests\StoreRecommandationsRequest;
use App\Http\Requests\UpdateRecommandationsRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\ForecastingService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;


class RecommandationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private function isBetterPrediction($newPrediction, $currentBestPrediction)
    {
        // Compare the average forecast values
        $newAverage = array_sum($newPrediction) / count($newPrediction);
        $currentBestAverage = array_sum($currentBestPrediction) / count($currentBestPrediction);

        return $newAverage > $currentBestAverage;
    }

    public function index()
    {
        
        $studentId = auth()->id();
        $studentName = Etudiant::where('id',$studentId)
        ->get();
       
        $courseDetails = CourDetail::where('etudiant_id', $studentId)
            ->orderBy('cour_id')
            ->orderBy('created_at')
            ->get(['cour_id', 'created_at', 'grade'])
            ->groupBy('cour_id');

        $bestCourse = null;
        $bestPrediction = null;

        foreach ($courseDetails as $courseId => $details) {
            
            $data = $details->map(function ($detail) {
                return [
                    'Date' => $detail->created_at->toDateString(), 
                    'Grade' => $detail->grade
                ];
            })->toArray();

            
            $response = Http::post('http://127.0.0.1:5000/predict', [
                'data' => $data
            ]);
            
            if ($response->successful()) {
                $prediction = $response->json();

                if (isset($prediction['forecast'])) {
                    $forecast = $prediction['forecast'];

                    
                    if (is_null($bestPrediction) || $this->isBetterPrediction($forecast, $bestPrediction)) {
                        $bestPrediction = $forecast;
                        $bestCourse = Cours::find($courseId);
                    }
                } else {
                    \Log::warning("No forecast data for course ID: $courseId");
                }
            } else {
                \Log::error('API request failed with status code: ' . $response->status());
            }
        }

       
        $courses = Cours::all(); 
        $details = CourDetail::all(); 

        return Inertia::render('Recomandations', [
            'courses' => $courses,
            'details' => $details,
            'bestcourse' => $bestCourse,
            'bestPrediction' => $bestPrediction,
            'StudentName' => $studentName,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
   

public function store(Request $request)
{
    $validatedData = $request->validate([
        'course_id' => 'required|exists:cours,id',
    ]);
    
    $etudiantId = auth()->user()->etudiant_id;
    $courseId = $request->input('course_id');
    
    $existingRattrapage = Rattrapage::where('etudiant_id', $etudiantId)
                                    ->where('cour_id', $courseId)
                                    ->where('is_declined', 0)
                                    ->where('is_accepted', 0)
                                    ->first();
    
    if ($existingRattrapage) {
        return redirect()->route('recom')
                         ->with('error', 'Already exists and has not been accepted or declined.');
    }

    Rattrapage::create([
        'etudiant_id' => $etudiantId,
        'cour_id' => $courseId,
        'is_declined' => 0,
        'is_accepted' => 0,
    ]);

    return redirect()->route('recom')
                     ->with('success', 'Submitted successfully');
}



    /**
     * Display the specified resource.
     */
    public function show(Recommandations $recommandations)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recommandations $recommandations)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRecommandationsRequest $request, Recommandations $recommandations)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recommandations $recommandations)
    {
        //
    }
}
