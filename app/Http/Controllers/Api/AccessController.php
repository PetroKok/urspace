<?php

namespace App\Http\Controllers\Api;

use App\Models\UserAccessFiles;
use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AccessController extends Controller
{
    public function access(Request $request)
    {
        $this->validate($request, [
            'files' => 'required',
            'email' => 'required',
            'time_to' => 'required',
        ]);
        $data = $request->all();
        $storing['time_to'] = $data['time_to'];

        $user = User::whereEmail($data['email'])->first();

        if ($user) {
            $sync_data = [];
            for ($i = 0; $i < count($data['files']); $i++)
                $sync_data[$data['files'][$i]] = ['time_to' => $data['time_to']];

            $user->file()->attach($sync_data);
            return response(['status' => 200, 'message' => 'OK!'], 200);
        }
        return response(['status' => 200, 'message' => 'User doesn\'t exists!'], 200);
    }
}
