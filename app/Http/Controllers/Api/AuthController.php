<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Models\Refresh;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function register(RegisterRequest $request)
    {
        $request['password'] = Hash::make($request['password']);
        $user = User::create($request->toArray());

        $user->createAccessAPI()->create([
            'token' => uniqid('kok_and_derk', true),
            'revoked' => '0',
        ]);


        $createdToken = $user->createToken('Laravel Password Grant Client');

        $token = $createdToken->accessToken; // auth token
        $response = ['token' => $token, "user" => $user];
        Cookie::queue(Cookie::make('token', $token, 60 * 24 * 30)); // set token to cookie

        return response($response, 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            if (Hash::check($request->password, $user->password)) {

                $refresh = $user->refreshes()->create([
                    'refresh' => uniqid('kok_and_derk', true)
                ]);

                $createdToken = $user->createToken('Laravel Password Grant Client');

                $token = $createdToken->accessToken; // auth token

                $response = ['message' => $token];

                Cookie::queue(Cookie::make('token', $token, 60 * 24 * 30));
                $response = ['token' => $token, "user" => $user, 'refresh' => $refresh->refresh];
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

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function logout(Request $request)
    {

        $token = $request->user()->token();
        $token->revoke();
        Cookie::queue(Cookie::forget('token'));

        $response = ['message' => 'You have been succesfully logged out!', 'code' => 200];
        return response($response, 200);

    }


    public function refresh(Request $request, $refresh)
    {

        $refresh = Refresh::whereRefresh($refresh)->first();

        $user = $refresh->user;

        if ($user) {
            $createdToken = $user->createToken('Laravel Password Grant Client');

            $refresh = $user->refreshes()->create([
                'refresh' => uniqid('kok_and_derk', true)
            ]);

            $token = $createdToken->accessToken; // auth token

            $response = ['message' => $token];

            Cookie::queue(Cookie::make('token', $token, 60 * 24 * 30));
            $response = ['token' => $token, "user" => $user, 'refresh' => $refresh->refresh];
            return response($response, 200);
        } else {
            $response = ['message' => "User doesn't exist!", 'error' => true];
            return response($response, 200);
        }
    }
}
