<?php

namespace Database\Factories;

use App\Models\Reminder;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reminder>
 */
class ReminderFactory extends Factory
{
    protected $model = Reminder::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph,
            'remind_at' => strtotime($this->faker->dateTimeBetween('now', '+1 month')->format('Y-m-d H:i:s')),
            'event_at' => strtotime($this->faker->dateTimeBetween('now', '+2 months')->format('Y-m-d H:i:s')),
            'user_id' => 1,
        ];
    }
}