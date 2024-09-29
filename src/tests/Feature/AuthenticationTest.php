<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * test_can_login_using_credentials
     *
     * @return void
     */
    public function test_can_login_using_credentials()
    {
        $user = User::factory()->create([
            'email' => 'alice@mail.com',
            'password' => bcrypt('123456')
        ]);

        $response = $this->postJson('/api/session', [
            'email' => 'alice@mail.com',
            'password' => '123456',
        ]);

        // Assert
        $response->assertStatus(200)
            ->assertJsonStructure([
                'ok',
                'data' => [
                    'user' => [
                        'id',
                        'email',
                        'name',
                    ],
                    'access_token',
                    'refresh_token',
                ],
            ]);

        $this->assertAuthenticatedAs($user);
    }

    /**
     * test_login_fails_with_invalid_credentials
     *
     * @return void
     */
    public function test_login_fails_with_invalid_credentials()
    {
        User::factory()->create([
            'email' => 'alice@mail.com',
            'password' => bcrypt('123456'),
        ]);

        $this->postJson('/api/session', [
            'email' => 'alice@mail.com',
            'password' => 'wrong_password',
        ])->assertStatus(401);
    }

    /**
     * test_can_refresh_access_token_with_valid_refresh_token
     *
     * @return void
     */
    public function test_can_refresh_access_token_with_valid_refresh_token()
    {
        // Create a user
        $user = User::factory()->create([
            'email' => 'alice@mail.com',
            'password' => bcrypt('123456'),
        ]);

        $response = $this->postJson('/api/session', [
            'email' => 'alice@mail.com',
            'password' => '123456',
        ]);

        $this->withHeader('Authorization', "Bearer {$response['data']['refresh_token']}")
            ->putJson('/api/session')
            ->assertStatus(200)
            ->assertJsonStructure(['data' => ['access_token']]);
    }

    /**
     * test_refresh_token_fails_with_invalid_refresh_token
     *
     * @return void
     */
    public function test_refresh_token_fails_with_invalid_refresh_token()
    {
        User::factory()->create([
            'email' => 'alice@mail.com',
            'password' => bcrypt('123456'),
        ]);

        $this->withHeader('Authorization', "Bearer wrong_refresh_token")
            ->putJson('/api/session')
            ->assertStatus(401);
    }

}