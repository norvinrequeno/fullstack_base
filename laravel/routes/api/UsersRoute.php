<?php

use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::middleware('role:superAdmin')->group(function () {
    Route::get('/users', [UsersController::class, "index"]);
    Route::post('/users/store', [UsersController::class, 'store']);
    Route::post('/users/update', [UsersController::class, 'update']);
    Route::post('/users/reset/password', [UsersController::class, 'resetPassword']);
    Route::post('/users/password', [UsersController::class, 'changePassword']);
});
