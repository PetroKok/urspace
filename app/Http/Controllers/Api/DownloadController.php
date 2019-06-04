<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

class DownloadController extends Controller
{
    public function index($slug){
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
                        return Response::download(Storage::path('public/'.$fullpath));
                    } catch (\Exception $e) {
                        return abort(404);
                    }
                } else {
                    $file = $user->file()->where('src', $slug)->first();
                    if ($file) {
                        $fullpath = $file->user_id . "/" . $slug;
                        try {
                            return Response::download(Storage::path('public/'.$fullpath));
                        } catch (\Exception $e) {
                            return abort(404);
                        }
                    } else {
                        return abort(404);
                    }
                }
            } else {
                return abort(404);
            }
        } else {
            return abort(404);
        }
    }
}
