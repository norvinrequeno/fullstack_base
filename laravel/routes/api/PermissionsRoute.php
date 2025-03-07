<?php

use App\Http\Controllers\PermissionsController;
use Illuminate\Support\Facades\Route;

Route::middleware('role:superAdmin')->group(function () {
    Route::get('/permissions', [PermissionsController::class, "index"]);
    Route::post('/permissions/get/', [PermissionsController::class, 'show']);
    Route::post('/permissions/store', [PermissionsController::class, 'store']);
    Route::post('/permissions/update', [PermissionsController::class, 'update']);
    Route::post('/permissions/delete', [PermissionsController::class, 'delete']);
});
