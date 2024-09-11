<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Cours;
use App\Models\CourDetail;

use App\Http\Requests\StoreRattrapageRequest;
use App\Http\Requests\UpdateRattrapageRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PredictionController extends Controller
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
        ->get(['cour_id', 'created_at', 'grade']);

        return Inertia::render('Predict', [
            'courses' => $courses,
            'details' => $details,
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
    public function store(StoreRattrapageRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Rattrapage $rattrapage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rattrapage $rattrapage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRattrapageRequest $request, Rattrapage $rattrapage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rattrapage $rattrapage)
    {
        //
    }
}
