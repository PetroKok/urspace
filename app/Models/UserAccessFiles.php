<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAccessFiles extends Model
{
    protected $fillable = ['user_id', 'file_id', 'time_to'];

    /** START RELATIONSHIP **/

    public function user(){
        return $this->belongsTo(User::class);
    }

    /** END RELATIONSHIP **/
}