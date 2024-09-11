<?php

namespace App\Http\Controllers;

use App\Models\Performances;
use App\Http\Requests\StorePerformancesRequest;
use App\Http\Requests\UpdatePerformancesRequest;

class PerformancesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StorePerformancesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Performances $performances)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Performances $performances)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePerformancesRequest $request, Performances $performances)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Performances $performances)
    {
        //
    }
}
