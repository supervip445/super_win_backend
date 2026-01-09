<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Public\PublicPostController;
use App\Http\Controllers\Public\LikeController;
use App\Http\Controllers\Public\CommentController;
use App\Http\Controllers\Public\PublicBannerController;
use App\Http\Controllers\Public\PublicAuthController;
use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\BannerTextController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ViewController;
use App\Http\Controllers\Admin\AdminChatController;
use App\Http\Controllers\Admin\PigVaccineController;
use App\Http\Controllers\Public\PublicPigVaccineController;
use App\Http\Controllers\Api\V1\Chat\AdminToUserChatController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public API routes (no authentication required)
Route::prefix('public')->group(function () {
    // Posts
    Route::get('/posts', [PublicPostController::class, 'index']);
    Route::get('/posts/{id}', [PublicPostController::class, 'show']);
    
    // Likes/Dislikes
    Route::post('/likes/toggle', [LikeController::class, 'toggle']);
    Route::get('/likes/counts', [LikeController::class, 'counts']);
    
    // Comments
    Route::get('/comments', [CommentController::class, 'index']);
    Route::post('/comments', [CommentController::class, 'store']);
    
    // Banners
    Route::get('/banners', [PublicBannerController::class, 'getBanners']);
    Route::get('/banner-texts', [PublicBannerController::class, 'getBannerTexts']);
    
    // Pig Vaccines
    Route::get('/pig-vaccines', [PublicPigVaccineController::class, 'index']);
    Route::get('/pig-vaccines/{id}', [PublicPigVaccineController::class, 'show']);
    
    // Public User Authentication
    Route::post('/register', [PublicAuthController::class, 'register']);
    Route::post('/login', [PublicAuthController::class, 'login']);
    
    // Protected public user routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/profile', [PublicAuthController::class, 'profile']);
        Route::post('/logout', [PublicAuthController::class, 'logout']);
        Route::prefix('chat')->group(function () {
        Route::get('messages', [AdminToUserChatController::class, 'index']);
        Route::post('messages', [AdminToUserChatController::class, 'store']);
    });
    });
});

// Admin authentication routes
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);
    
    // Protected admin routes
    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::get('/check', [AdminAuthController::class, 'check']);
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::get('/profile', [AdminAuthController::class, 'profile']);
        Route::put('/profile', [AdminAuthController::class, 'updateProfile']);
        Route::post('/change-password', [AdminAuthController::class, 'changePassword']);
        
        // Categories
        Route::apiResource('categories', CategoryController::class);
        
        // Posts
        Route::apiResource('posts', PostController::class);
        
        // Contacts
        Route::apiResource('contacts', ContactController::class)->except(['store']);
        Route::post('/contacts/{id}/read', [ContactController::class, 'markAsRead']);
        
        // Banners
        Route::apiResource('banners', BannerController::class);
        
        // Banner Texts
        Route::apiResource('banner-texts', BannerTextController::class);
        
        // Pig Vaccines
        Route::apiResource('pig-vaccines', PigVaccineController::class);
        
        // Users (for teachers dropdown)
        Route::get('/users', [UserController::class, 'index']);
        
        // Views
        Route::get('/views', [ViewController::class, 'getViews']);
        Route::get('/views/stats', [ViewController::class, 'getStats']);
        
        // Admin Chat
        Route::prefix('chat')->group(function () {
            Route::get('/users', [AdminChatController::class, 'getUsers']);
            Route::get('/users/{userId}/messages', [AdminChatController::class, 'getMessages']);
            Route::post('/users/{userId}/messages', [AdminChatController::class, 'sendMessage']);
        });
    });
});
