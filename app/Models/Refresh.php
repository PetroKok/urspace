<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Refresh extends Model
{
    protected $fillable = [
        'user_id',
        'refresh',
        'revoked'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
