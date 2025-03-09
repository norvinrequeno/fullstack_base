<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class user_role extends Model
{
    protected $table = "model_has_roles";
    public $timestamps = false;
    public $incrementing = false;

    public function users()
    {
        return $this->belongsTo(Permission::class, 'model_id');
    }
    public function roles()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }
}
