<?php

namespace App\Http\Controllers;

use App\Models\CourDetails;
use App\Http\Requests\UpdateCourDetailsRequest;
use App\Http\Requests\StoreCourDetailsRequest;
use App\Models\Cours;
use App\Models\CourDetail;
use App\Models\Rate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CourDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
   
    $courses = Cours::all(); 

    
    $studentId = Auth::user()->etudiant_id; 

    
    $details = CourDetail::where('etudiant_id', $studentId)
        ->orderBy('cour_id')
        ->orderBy('created_at')
        ->get();

    $ratedDetails = Rate::where('etudiant_id', $studentId)
        ->pluck('cour_details_id'); 

    
    return Inertia::render('CourDetail', [
        'courses' => $courses,
        'details' => $details,
        'ratedDetails' => $ratedDetails, 
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
    

    Rate::create([
        'etudiant_id' => auth()->user()->etudiant_id,
        'cour_id' => $request->course_id, 
        'cour_details_id' => $request->detail_id, 
        'Rate' => $request->rate,
    ]);

    return redirect()->back()->with('success', 'Rate submitted successfully!');
}





    

    
    

    /**
     * Display the specified resource.
     */
    public function show(CourDetails $courDetails)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CourDetails $courDetails)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourDetailsRequest $request, CourDetails $courDetails)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CourDetails $courDetails)
    {
        //
    }
}
