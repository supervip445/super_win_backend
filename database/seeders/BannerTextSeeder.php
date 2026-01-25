<?php

namespace Database\Seeders;

use App\Models\BannerText;
use App\Models\User;
use Illuminate\Database\Seeder;

class BannerTextSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get SuperAdmin user
        $admin = User::where('type', 'super_admin')->first();
        
        if (!$admin) {
            $this->command->error('SuperAdmin user not found. Please run UsersTableSeeder first.');
            return;
        }

        $bannerTexts = [
            [
                'text' => 'Welcome to SUPERWINLIVESTOCKGROUP - Your trusted partner in livestock farming and premium feed solutions',
                'is_active' => true,
            ],
            [
                'text' => 'High-quality pig and hen feed products - Supporting healthy and productive livestock for better farming',
                'is_active' => true,
            ],
            [
                'text' => 'Premium livestock feed for pigs and hens - Boost your farm productivity with our nutritious feed solutions',
                'is_active' => true,
            ],
            [
                'text' => 'New product launch coming soon - Enhanced nutrition formula for faster growth and better health',
                'is_active' => false,
            ],
            [
                'text' => 'Business Hours: Monday - Saturday 8:00 AM - 6:00 PM | Contact us for inquiries about our feed products',
                'is_active' => true,
            ],
            [
                'text' => 'Expert advice on livestock farming and feed management - Consult with our team for optimal results',
                'is_active' => true,
            ],
            [
                'text' => 'Quality feed, quality livestock - Experience the difference with SUPERWINLIVESTOCKGROUP products',
                'is_active' => true,
            ],
        ];

        foreach ($bannerTexts as $bannerText) {
            BannerText::create([
                'text' => $bannerText['text'],
                'is_active' => $bannerText['is_active'],
                'admin_id' => $admin->id,
            ]);
        }

        $this->command->info('Banner text seeding completed!');
        $this->command->info('Created ' . count($bannerTexts) . ' banner texts.');
    }
}

