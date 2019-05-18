<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessAPI extends Model
{
    protected $table = 'access_apis';
    protected $fillable = ['user_id', 'token', 'revoked'];


    /** START RELATIONSHIP **/

    public function user(){
        return $this->belongsTo(User::class);
    }

    /** END RELATIONSHIP **/

}
