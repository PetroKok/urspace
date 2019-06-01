<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $request['password'] = Hash::make($request['password']);
        $user = User::create($request->toArray());
        $user->createAccessAPI()->create([
            'token' => uniqid('kok', true),
            'revoked' => '0',
        ]);

        $token = $user->createToken('Laravel Password Grant Client')->accessToken;
        $response = ['token' => $token, "user" => $user];
        Cookie::queue(Cookie::make('token', $token, 60*24*30));

        return response($response, 200);

    }

    public function login(Request $request)
    {
        $this->validate($request,[
            'email' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('Laravel Password Grant Client')->accessToken;
                Cookie::queue(Cookie::make('token', $token, 60*24*30));
                $response = ['token' => $token, "user" => $user];
                return response($response, 200);
            } else {
                $response = ['message' => "Password mismatch!", 'error' => true];
                return response($response, 200);
            }
        } else {
            $response = ['message' => "User doesn't exist!", 'error' => true];
            return response($response, 200);
        }

    }

    public function logout(Request $request)
    {

        $token = $request->user()->token();
        $token->revoke();
        Cookie::queue(Cookie::forget('token'));

        $response = ['message' => 'You have been succesfully logged out!', 'code' => 200];
        return response($response, 200);

    }
}
