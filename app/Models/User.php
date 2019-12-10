<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    const TYPE = [
        'one' => 1
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /** START RELATIONSHIP **/

    public function files(){
        return $this->hasMany(File::class);
    }

    public function access_api(){
        return $this->hasMany(AccessAPI::class)->where('revoked', 0);
    }

    public function createAccessAPI(){
        return $this->hasMany(AccessAPI::class);
    }


    public function file(){
        return $this->belongsToMany(File::class)->wherePivot('time_to', '>=', Carbon::now())->withPivot('time_to');
    }

    public function refreshes(){
        return $this->hasMany(Refresh::class);
    }

    /** END RELATIONSHIP **/


    public static function ban(){

    }
}
