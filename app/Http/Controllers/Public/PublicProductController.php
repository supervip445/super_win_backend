<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class PublicProductController extends Controller
{
    /**
     * Display a listing of products (public)
     */
    public function index(Request $request)
    {
        $query = Product::where('status', 'active')->orderBy('created_at', 'desc');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name_en', 'like', "%{$search}%")
                  ->orWhere('name_mm', 'like', "%{$search}%")
                  ->orWhere('composition', 'like', "%{$search}%");
            });
        }

        $products = $query->paginate($request->get('per_page', 20));

        // Transform image URLs
        $products->getCollection()->transform(function ($product) {
            if ($product->image) {
                $product->image = asset('storage/' . $product->image);
            }
            return $product;
        });

        return response()->json([
            'data' => $products->items(),
            'current_page' => $products->currentPage(),
            'last_page' => $products->lastPage(),
            'per_page' => $products->perPage(),
            'total' => $products->total(),
        ]);
    }

    /**
     * Display the specified product (public)
     */
    public function show($id)
    {
        $product = Product::where('status', 'active')->findOrFail($id);

        if ($product->image) {
            $product->image = asset('storage/' . $product->image);
        }

        return response()->json([
            'data' => $product,
        ]);
    }
}
