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

        $email = $request->email || 'kokpetro15@gmail.com';

        $data = $request->all();

        $attachedFiles = [];

        foreach ($data['files'] as $key => $id) {
            $file = $request->user()->files()->find($id);
            $attachedFiles[$key] = 'app/public/' . $request->user()->id . '/' . $file->src;
        }

        Mail::to($email)->send(new FilesSend($attachedFiles, $request->user()->name));
        return response(['status' => 200, 'message' => count($attachedFiles).' files sent to ' . $email], 200);
    }
}
