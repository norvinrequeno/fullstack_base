<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Models\Permission;

class PermissionsController extends Controller
{
    public function index()
    {
        try {
            return response()->json(
                ['permissions' => $this->allPermissions()]
            );
        } catch (\Throwable $th) {
            return response()
                ->json(
                    ['message' => 'Error interno'],
                    JsonResponse::HTTP_INTERNAL_SERVER_ERROR
                );
        }
    }

    public function allPermissions()
    {
        return Permission::all();
    }

    public function store(Request $r)
    {
        try {
            $r->validate(['name' => ['required', 'string', 'max:255']]);

            //Creación de permiso utilizando el modelo de Spatie
            $permission = Permission::create(['name' => $r->name]);
            return response()->json(['permission' => $permission]);
        } catch (ValidationException $e) {
            return response()
                ->json(
                    ['message' => 'Es requerido proporcionar los parámetros (:name)'],
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
}
