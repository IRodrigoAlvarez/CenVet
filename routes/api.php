<?php

use App\Http\Controllers\Controller;
use App\Http\Controllers\ReservaHorasController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Auth
Route::post('/login', [Controller::class, 'login'])->name('login');

// Agenda
Route::get('/agenda/fechas/{año}/{mes}', [ReservaHorasController::class, 'obtenerFechas']);
Route::get('/agenda/horas/{año}/{mes}/{dia}', [ReservaHorasController::class, 'obtenerHoras']);
Route::post('/agenda', [ReservaHorasController::class, 'reservarHora']);


// CRUD Usuarios
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'delete']);
});