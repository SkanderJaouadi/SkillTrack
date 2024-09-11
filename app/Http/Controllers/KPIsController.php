<?php

namespace App\Http\Controllers;
use App\Models\Cours;
use App\Http\Requests\UpdateKPIsRequest;
use App\Http\Requests\StoreKPIsRequest;
use App\Models\KPIs;
use App\Models\Selected_kpis;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KPIsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $courses = Cours::all();
    $kpi = KPIs::all();
    $studentId = Auth::user()->etudiant_id;
    $selectedKpis = Selected_kpis::where('etudiant_id', $studentId)->get()->toArray();

    return Inertia::render('KPIdash', [
        'courses' => $courses,
        'kpis' => $kpi,
        'selected_kpis' => $selectedKpis
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
    public function store(StoreKPIsRequest $request)
{
    Selected_kpis::create([
        'etudiant_id' => auth()->user()->etudiant_id,
        'cour_id' => $request->course_id, 
        'k_p_is_id' => $request->kpi_id,
    ]);

    return redirect()->back();
}

    /**
     * Display the specified resource.
     */
    public function show(KPIs $kPIs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KPIs $kPIs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KPIs $kPIs)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id, Request $request)
{
    $kpi = Selected_kpis::where([
        ['etudiant_id', auth()->user()->etudiant_id],
        ['cour_id', $request->course_id],
        ['k_p_is_id', $id]
    ])->first();

    if ($kpi) {
        $kpi->delete();
    }

    return redirect()->back();
}

}
