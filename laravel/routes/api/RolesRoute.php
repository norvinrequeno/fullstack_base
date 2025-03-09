<?php

use App\Http\Controllers\RolesController;
use Illuminate\Support\Facades\Route;

Route::middleware('role:superAdmin')->group(function () {
    Route::get('/roles', [RolesController::class, "index"]);
    Route::post('/roles/get', [RolesController::class, 'show']);
    Route::post('/roles/users/get', [RolesController::class, 'users']);
    Route::post('/roles/store', [RolesController::class, 'store']);
    Route::post('/roles/update', [RolesController::class, 'update']);
    Route::post('/roles/delete', [RolesController::class, 'delete']);
    Route::post('/roles/permissions/change', [RolesController::class, 'permissionChange']);
});
