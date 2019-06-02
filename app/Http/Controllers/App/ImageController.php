<?php

namespace App\Http\Controllers\App;

use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;


class ImageController extends Controller
{
    public function index(Request $request, $slug)
    {
        $jti = ((array)json_decode(base64_decode(explode('.', Cookie::get('token'))[0])));
        if (isset($jti['jti']) && $jti['jti']) {
            $access = (array)DB::table('oauth_access_tokens')->where('revoked', 0)->find($jti['jti']);

            if ($access !== []) {
                $user = User::find($access['user_id']);
                $file = $user->files()->where('src', $slug)->first();
//                return Storage::exists('app/public/' .$user->id . "/{$slug}");
                if ($file) {
                    $fullpath = $user->id . "/{$slug}";
                    try {
                        return response()->download(storage_path('app/public/' . $fullpath), null, [], null);
                    } catch (\Exception $e) {
                        return abort(404);
                    }
                } else {
                    return abort(404);
                }
            } else {
                return abort(404);
            }
        } else {
            return abort(404);
        }
    }

    public function file(Request $request, $slug)
    {
        $file = File::where('src', $slug)->first();
        if ($file){
            $fullpath = $file->user_id . "/{$file->src}";
            return response()->download(storage_path('app/public/' . $fullpath), null, [], null);
        }
    }
}
