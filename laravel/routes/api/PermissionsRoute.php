<?php

use App\Http\Controllers\RolesController;
use Illuminate\Support\Facades\Route;

Route::middleware('roles:superAdmin')->group(function () {
    Route::get('/permissions', [RolesController::class, "index"]);
    Route::post('/permissions/get/', [RolesController::class, 'show']);
    Route::post('/permissions/store', [RolesController::class, 'store']);
    Route::post('/permissions/update', [RolesController::class, 'update']);
    Route::post('/permissions/delete', [RolesController::class, 'delete']);
});
