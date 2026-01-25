<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::orderBy('created_at', 'desc');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name_en', 'like', "%{$search}%")
                  ->orWhere('name_mm', 'like', "%{$search}%")
                  ->orWhere('composition', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name_en' => 'required|string|max:255',
            'name_mm' => 'required|string|max:255',
            'composition' => 'nullable|string',
            'indications_chicken' => 'nullable|string',
            'indications_pig' => 'nullable|string',
            'indications_cow' => 'nullable|string',
            'dosage_chicken' => 'nullable|string',
            'dosage_pig' => 'nullable|string',
            'dosage_cow' => 'nullable|string',
            'packaging' => 'nullable|string',
            'storage' => 'nullable|string',
            'special_features' => 'nullable|string',
            'image' => 'nullable|image|max:256000', // 250MB in kilobytes (250 * 1024)
            'status' => 'required|in:active,inactive',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $product = Product::create($validated);

        if ($product->image) {
            $product->image = asset('storage/' . $product->image);
        }

        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);

        if ($product->image) {
            $product->image = asset('storage/' . $product->image);
        }

        return response()->json([
            'data' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name_en' => 'required|string|max:255',
            'name_mm' => 'required|string|max:255',
            'composition' => 'nullable|string',
            'indications_chicken' => 'nullable|string',
            'indications_pig' => 'nullable|string',
            'indications_cow' => 'nullable|string',
            'dosage_chicken' => 'nullable|string',
            'dosage_pig' => 'nullable|string',
            'dosage_cow' => 'nullable|string',
            'packaging' => 'nullable|string',
            'storage' => 'nullable|string',
            'special_features' => 'nullable|string',
            'image' => 'nullable|image|max:256000', // 250MB in kilobytes (250 * 1024)
            'status' => 'required|in:active,inactive',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($validated);

        if ($product->image) {
            $product->image = asset('storage/' . $product->image);
        }

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        
        // Delete image if exists
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully',
        ]);
    }
}
