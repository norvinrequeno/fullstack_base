<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user'])
        ->middleware('permission:admin');
    Route::post('/logout', [AuthController::class, 'logout']);

    //agregar las rutas en la carpeta ./api
    foreach (File::glob(__DIR__ . "/api/*.php") as $routeFile) {
        require $routeFile;
    }
});
