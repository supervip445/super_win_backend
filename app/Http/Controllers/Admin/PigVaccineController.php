<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PigVaccine;
use Illuminate\Http\Request;

class PigVaccineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = PigVaccine::orderBy('disease_en');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('disease_en', 'like', "%{$search}%")
                  ->orWhere('vaccine_type_en', 'like', "%{$search}%")
                  ->orWhere('name_mm', 'like', "%{$search}%")
                  ->orWhere('target_stages', 'like', "%{$search}%");
            });
        }

        $vaccines = $query->paginate($request->get('per_page', 20));

        return response()->json([
            'data' => $vaccines->items(),
            'current_page' => $vaccines->currentPage(),
            'last_page' => $vaccines->lastPage(),
            'per_page' => $vaccines->perPage(),
            'total' => $vaccines->total(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'disease_en' => 'required|string|max:255',
            'vaccine_type_en' => 'nullable|string|max:255',
            'name_mm' => 'required|string|max:255',
            'target_stages' => 'required|string|max:255',
        ]);

        $vaccine = PigVaccine::create($validated);

        return response()->json([
            'message' => 'Pig vaccine created successfully',
            'data' => $vaccine,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $vaccine = PigVaccine::findOrFail($id);

        return response()->json([
            'data' => $vaccine,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $vaccine = PigVaccine::findOrFail($id);

        $validated = $request->validate([
            'disease_en' => 'required|string|max:255',
            'vaccine_type_en' => 'nullable|string|max:255',
            'name_mm' => 'required|string|max:255',
            'target_stages' => 'required|string|max:255',
        ]);

        $vaccine->update($validated);

        return response()->json([
            'message' => 'Pig vaccine updated successfully',
            'data' => $vaccine,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $vaccine = PigVaccine::findOrFail($id);
        $vaccine->delete();

        return response()->json([
            'message' => 'Pig vaccine deleted successfully',
        ]);
    }
}


