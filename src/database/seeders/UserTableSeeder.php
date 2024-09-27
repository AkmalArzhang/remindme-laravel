<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert(
            [
                [
                    'name' => "Alice",
                    "email" => "alice@mail.com",
                    "password" => Hash::make('123456')
                ],
                [
                    'name' => "Bob",
                    "email" => "bob@mail.com",
                    "password" => Hash::make('123456')
                ]
            ]
        );
    }
}