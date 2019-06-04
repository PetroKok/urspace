<?php

namespace App\Http\Controllers\Api;

use App\Mail\FilesSend;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function send(Request $request)
    {

        $this->validate($request, [
           'email' => 'required'
        ]);

        $url = '';

        $user = $request->user();

        $email = $request->email;

        $data = $request->all();

        $attachedFiles = [];

        foreach ($data['files'] as $key => $id) {
            $file = $request->user()->files()->find($id);
            if(!$file){
                $file = $user->file()->find($id);
                if(!$file){
                    continue;
                }else{
                    $url = $file->user_id . '/' . $file->src;
                }
            }else{
                $url = $request->user()->id . '/' . $file->src;
            }

            $attachedFiles[$key] = 'app/public/' . $url;
        }

        Mail::to($email)->send(new FilesSend($attachedFiles, $request->user()->name));
        return response(['status' => 200, 'message' => count($attachedFiles).' files sent to ' . $email], 200);
    }
}
