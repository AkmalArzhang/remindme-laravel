<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReminderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('session', [AuthController::class, 'authenticate']);
Route::put('session', [AuthController::class, 'refreshToken']);

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('reminders', ReminderController::class);
    Route::post('logout', [AuthController::class, 'logout']);
});
