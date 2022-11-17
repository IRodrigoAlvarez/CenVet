<?php

use App\Http\Controllers\Controller;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


// Users routes
// Route::get('/users', [UserController::class, 'index']);
// Route::get('/users/{user}', [UserController::class, 'show']);
// Route::post('/users', [UserController::class, 'store']);
// Route::put('/users/{user}', [UserController::class, 'update']);
// Route::delete('/users/{user}', [UserController::class, 'delete']);

// Auth
Route::post('/login', [Controller::class, 'login'])->name('login');

// Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'index']);


// Route::middleware('auth:sanctum')->function () {
//     Route::get('/users  ', [UserController::class, 'index']);
// };

// Route::group(['middleware' => 'auth'], function () {
//     Route::get('/users', [UserController::class, 'index']);
// });

Route::middleware('auth:sanctum')->group(function () {
    // Authenticated Routes in api.php
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'delete']);
});