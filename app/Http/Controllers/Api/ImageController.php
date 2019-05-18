<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function index(Request $request, $slug)
    {


        $fullpath = "1/{$slug}";

        try {
            return response(['image' => storage_path('app/public/' . $fullpath)]);

        } catch (\Exception $e) {
            return "File not found";
        }

    }
}
