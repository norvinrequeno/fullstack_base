<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Role;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/get_permission', function () {
    if (Role::where('name', 'superAdmin')->count() == 0) {
        Role::create(['name' => 'superAdmin']);
    }
    $user = User::find(2);
    if ($user == null) return "Usuario no encontrado";
    $user->assignRole('superAdmin');
    return $user;
});
