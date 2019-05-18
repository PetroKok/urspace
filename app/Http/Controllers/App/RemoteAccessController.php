<?php

namespace App\Http\Controllers\App;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RemoteAccessController extends Controller
{

    public function __construct()
    {
        $this->middleware('access.remote');
    }

    public function upload(Request $request){
        return response([$request], 200);
    }

    public function download(Request $request, $slug){
        $user = $request->user->user;
        return response([get_class_methods($user)], 200);
        return response([$user, $slug], 200);
    }
}
