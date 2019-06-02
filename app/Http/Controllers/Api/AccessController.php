<?php

namespace App\Http\Controllers\Api;

use App\Models\UserAccessFiles;
use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AccessController extends Controller
{
    public function access(Request $request){
        $this->validate($request, [
            'files' => 'required',
            'email' => 'required',
            'time_to' => 'required',
        ]);

        $data = $request->all();

        $storing['time_to'] = $data['time_to'];

        foreach($data['files'] as $file){
            $f = File::find($file);
            $user = User::whereEmail($data['email'])->first();
            if($f and $user){
                $storing['user_id'] = $user->id;
                $storing['file_id'] = $f->id;
                UserAccessFiles::create($storing);
            } else{
                return response(['status' => 200, 'message' => 'User doesn\'t exists!'],200);
            }
        }
        return response(['status' => 200, 'message' => 'Access for user '.$data['email'].' applied'],200);
    }
}
