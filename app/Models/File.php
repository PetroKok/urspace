<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class File extends Model
{
    protected $fillable = ["name", "type", "src", "size", "user_id"];

    protected $appends = ['link'];

    /** START RELATIONSHIP **/

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getLinkAttribute()
    {
        return 'public/' . Auth::user()->id . '/' . $this->src;
    }

    /** END RELATIONSHIP **/


}
