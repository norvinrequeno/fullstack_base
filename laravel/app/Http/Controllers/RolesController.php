<?php

namespace App\Http\Controllers;

use App\Models\roles;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
    public function index()
    {
        try {
            return response()->json(
                ['roles' => roles::all()]
            );
        } catch (\Throwable $th) {
            return response()
                ->json(
                    ['message' => 'Error interno'],
                    JsonResponse::HTTP_INTERNAL_SERVER_ERROR
                );
        }
    }
    public function show(Request $r)
    {
        try {
            $r->validate(['id' => ['required', 'string', 'max:256']]);

            return response()->json(
                ['role' => roles::find(Crypt::decryptString($r->id))]
            );
        } catch (DecryptException $e) {
            return response()
                ->json(
                    ['message' => 'Error al desencriptar el identificador proporcionado.'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
        } catch (ValidationException $e) {
            return response()
                ->json(
                    ['message' => 'Es requerido proporcionar los parámetros (:id)'],
                    JsonResponse::HTTP_UNPROCESSABLE_ENTITY
                );
        } catch (\Throwable $th) {
            return response()
                ->json(
                    ['message' => 'Error interno'],
                    JsonResponse::HTTP_INTERNAL_SERVER_ERROR
                );
        }
    }
    public function store(Request $r)
    {
        try {
            $r->validate(['role' => ['required', 'string', 'max:255']]);

            //Creación de rol utilizando el modelo de Spatie
            $role = Role::create(['name' => $r->role]);

            return response()->json(['role' => roles::find($role->id)]);
        } catch (ValidationException $e) {
            return response()
                ->json(
                    ['message' => 'Es requerido proporcionar los parámetros (:role)'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
        } catch (\Throwable $th) {
            return response()
                ->json(
                    ['message' => 'Error interno'],
                    JsonResponse::HTTP_INTERNAL_SERVER_ERROR
                );
        }
    }
    public function update(Request $r)
    {
        try {
            $r->validate(['role' => ['required', 'string', 'max:255']]);
            //Creación de rol utilizando el modelo de Spatie
            $id = Crypt::decryptString($r->id);
            $role = roles::find($id);
            $role->name = $r->role;
            $role->save();
            return response()->json(['role' => $role]);
        } catch (DecryptException $e) {
            return response()
                ->json(
                    ['message' => 'Error al desencriptar el identificador proporcionado.'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
        } catch (ValidationException $e) {
            return response()
                ->json(
                    ['message' => 'Es requerido proporcionar los parámetros (:role)'],
                    JsonResponse::HTTP_UNPROCESSABLE_ENTITY
                );
        } catch (\Throwable $th) {
            return response()
                ->json(
                    ['message' => 'Error interno'],
                    JsonResponse::HTTP_INTERNAL_SERVER_ERROR
                );
        }
    }

    public function delete(Request $r)
    {
        try {
            $r->validate(['id' => ['required', 'string', 'max:255']]);
            //Creación de rol utilizando el modelo de Spatie
            $id = Crypt::decryptString($r->id);
            $role = roles::destroy($id);
            return response()->json(['message' => "Registro eliminado con éxito."]);
        } catch (DecryptException $e) {
            return response()
                ->json(
                    ['message' => 'Error al desencriptar el identificador proporcionado.'],
                    JsonResponse::HTTP_BAD_REQUEST
                );
        } catch (ValidationException $e) {
            return response()
                ->json(
                    ['message' => 'Es requerido proporcionar los parámetros (:id)'],
                    JsonResponse::HTTP_UNPROCESSABLE_ENTITY
                );
        } catch (\Throwable $th) {
            return response()
                ->json(
                    ['message' => 'Error interno' . $th->getMessage()],
                    JsonResponse::HTTP_INTERNAL_SERVER_ERROR
                );
        }
    }
}
