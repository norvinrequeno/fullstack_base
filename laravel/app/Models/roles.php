<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class roles extends Model
{
    use HasFactory;

    protected $table = "roles";
    protected $appends = ['cid'];
    protected $fillable = ['name', 'cid'];
    public function cid(): Attribute
    {
        return Attribute::make(
            get: fn() => Crypt::encryptString($this->id)
        );
    }
}
