<?php

namespace App\Http\Middleware;

use App\Models\AccessAPI;
use Closure;
use http\Client\Curl\User;

class AccessRemoteMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = AccessAPI::where('token', $request->secret)->first();
        if($user){
            $request->user = $user;
            return $next($request);
        }
        return abort(404);
    }
}
