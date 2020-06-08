<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class File extends Model
{
    protected $fillable = ["name", "type", "src", "size", "user_id", "compressed"];

    protected $appends = ['link'];

    /** START RELATIONSHIP **/

    public function user()
    {
       $this->belongsToMany(User::class)->wherePivot('time_to', '>=', Carbon::now());
    }

    public function getLinkAttribute()
    {
        return 'public/' . Auth::user()->id . '/' . $this->src;
    }

    /** END RELATIONSHIP **/


}
