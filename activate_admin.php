<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use App\Enums\UserType;
use Illuminate\Support\Facades\Hash;

echo "Activating admin user account...\n\n";

// Find the user
$user = User::where('user_name', 'superwin')->first();

if ($user) {
    echo "Found user: {$user->name} (username: {$user->user_name})\n";
    echo "Current status: {$user->status}\n";
    echo "Current type: {$user->type->value}\n\n";
    
    // Update status to active and ensure type is SuperAdmin
    $user->status = 1;
    $user->type = UserType::SuperAdmin;
    $user->save();
    
    echo "✅ User activated successfully!\n";
    echo "New status: {$user->status}\n";
    echo "User type: {$user->type->value}\n";
    echo "\nYou can now login with:\n";
    echo "Username: superwin\n";
    echo "Password: superwingroup\n";
} else {
    echo "❌ User 'superwin' not found!\n";
    echo "Creating new admin user...\n";
    
    $user = User::create([
        'name' => 'SuperWin',
        'user_name' => 'superwin',
        'phone' => '09123456789',
        'password' => Hash::make('superwingroup'),
        'status' => 1,
        'is_changed_password' => 1,
        'type' => UserType::SuperAdmin->value,
    ]);
    
    echo "✅ Admin user created successfully!\n";
    echo "Username: superwin\n";
    echo "Password: superwingroup\n";
}

echo "\nDone!\n";

