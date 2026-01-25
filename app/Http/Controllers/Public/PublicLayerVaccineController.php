<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\LayerVaccine;
use Illuminate\Http\Request;

class PublicLayerVaccineController extends Controller
{
    /**
     * Display a listing of layer vaccines (public)
     */
    public function index(Request $request)
    {
        $query = LayerVaccine::orderBy('disease_en');

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

        // Filter by target stage
        if ($request->has('target_stage') && $request->target_stage) {
            $query->where('target_stages', 'like', "%{$request->target_stage}%");
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
     * Display the specified layer vaccine (public)
     */
    public function show($id)
    {
        $vaccine = LayerVaccine::findOrFail($id);

        return response()->json([
            'data' => $vaccine,
        ]);
    }
}
