<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reminder;

class ReminderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Reminder::factory()->count(10)->create();
    }
}
