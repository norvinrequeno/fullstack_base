<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UsersController extends Controller
{
    public function index(Request $r)
    {
        return response()->json(["users" => User::all()]);
    }

    public function store(Request $r)
    {
        try {
            $r->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email', 'max:255'],
            ]);
            $user = User::create([
                'name' => $r->name,
                'email' => $r->email,
                'password' => Hash::make("12345678")
            ]);

            return response()->json(['user' => User::find($user->id)]);
        } catch (ValidationException $e) {
            return response()
                ->json(
                    ['message' => 'Es requerido proporcionar los parámetros (:role)'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
        } catch (\Throwable $th) {
            return response()
                ->json(
                    ['message' => 'Error interno' . $th->getMessage()],
                    JsonResponse::HTTP_INTERNAL_SERVER_ERROR
                );
        }
    }

    public function resetPassword(Request $r)
    {
        try {
            $r->validate([
                'id' => ['required', 'string', 'max:255'],
            ]);
            $user = User::find(Crypt::decryptString($r->id));
            if (!$user || $user === null)
                throw new Exception("No se encontró el usuario.");

            $user->password =  Hash::make("12345678");
            $user->save();
            return response()->json(["message" => "Se cambio la contraseña por defecto (12345678)"]);
        } catch (ValidationException $e) {
            return response()
                ->json(
                    ['message' => 'Es requerido proporcionar los parámetros (:role)'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
        } catch (\Throwable $th) {
            return response()
                ->json(
                    ['message' => 'Error interno' . $th->getMessage()],
                    JsonResponse::HTTP_INTERNAL_SERVER_ERROR
                );
        } catch (DecryptException $e) {
            return response()
                ->json(
                    ['message' => 'Error al desencriptar el identificador proporcionado.'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
        }
    }
}
