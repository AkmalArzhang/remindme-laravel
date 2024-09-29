<?php
namespace Tests\Feature;

use App\Models\Reminder;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReminderControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * authenticateUser
     *
     * @return void
     */
    protected function authenticateUser()
    {
        $this->actingAs(User::factory()->create());
    }

    /**
     * test_can_list_reminders
     *
     * @return void
     */
    public function test_can_list_reminders()
    {
        $this->authenticateUser();

        Reminder::factory()->count(5)->create();

        $this->getJson('/api/reminders')
            ->assertStatus(200);
    }

    /**
     * test_can_create_reminder
     *
     * @return void
     */
    public function test_can_create_reminder()
    {
        $this->authenticateUser();

        $data = ['title' => 'Doctor Appointment', 'description' => 'Visit the doctor', 'remind_at' => now()->timestamp, 'event_at' => now()->timestamp];

        $this->postJson('/api/reminders', $data)
            ->assertStatus(200)
            ->assertJsonFragment(['title' => 'Doctor Appointment']);
    }

    /**
     * test_can_view_single_reminder
     *
     * @return void
     */
    public function test_can_view_single_reminder()
    {
        $this->authenticateUser();

        $reminder = Reminder::factory()->create();

        $this->getJson("/api/reminders/{$reminder->id}")
            ->assertStatus(200);
    }

    /**
     * test_can_update_reminder
     *
     * @return void
     */
    public function test_can_update_reminder()
    {
        $this->authenticateUser();

        $reminder = Reminder::factory()->create();

        $data = ['title' => 'Updated Title', 'description' => 'Updated Description', 'remind_at' => now()->timestamp, 'event_at' => now()->timestamp];

        $this->putJson("/api/reminders/{$reminder->id}", $data)
            ->assertStatus(200)
            ->assertJsonFragment(['title' => 'Updated Title']);
    }

    /**
     * test_can_delete_reminder
     *
     * @return void
     */
    public function test_can_delete_reminder()
    {
        $this->authenticateUser();

        $reminder = Reminder::factory()->create();

        $this->deleteJson("/api/reminders/{$reminder->id}")
            ->assertStatus(200);

        $this->assertDatabaseMissing('reminders', ['id' => $reminder->id]);
    }
}