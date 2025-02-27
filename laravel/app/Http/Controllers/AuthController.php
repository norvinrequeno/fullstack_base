<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $r)
    {
        try {
            $r->validate([
                'name' => ['required', 'string'],
                'email' => ['required', 'string', 'email', 'unique:users'],
                'password' => ['required', 'min:8']
            ]);
            User::create([
                'name' => $r->name,
                'email' => $r->email,
                'password' => Hash::make($r->password)
            ]);
            return response()->json(['message' => 'Usuario registrado con éxito'], 201);
        } catch (ValidationException $e) {
            $err = $e->validator->errors()->all();
            return response()->json(['error' => 'Error de validación: ' . implode(' ', $err)], 422);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error interno: ' . $e->getMessage()], 500);
        }
    }

    public function login(Request $r)
    {
        $r->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($r->only('email', 'password')))
            return response()->json(['message' => 'Credenciales incorrectas'], 401);

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(
            [
                'token' => $token,
                'user' => [
                    'name' => $user->name,
                    'roles' => $user->getRoleNames(),
                    'permissions' => $user->getAllPermissions()->pluck('name'),
                ]
            ],
            200
        );
    }

    public function logout(Request $r)
    {
        try {
            $r->user()->tokens()->delete();
            return response()->json(['message' => 'Sesión cerrada'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => "Error " . $th->getMessage()], 200);
        }
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
