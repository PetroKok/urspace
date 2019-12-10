<?php

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/refresh/{refresh}', 'AuthController@refresh');

Route::get('/download/{slug}', 'DownloadController@index');

Route::group(['middleware' => ['api-header','json.response']], function () {

    // PUBLIC ROUTES
    Route::post('/user/login', 'AuthController@login')->name('login.api');
    Route::post('/user/register', 'AuthController@register')->name('register.api');

//    Route::get('/files/{slug}','ImageController@index');

    // PRIVATE ROUTES
    Route::middleware('auth:api')->group(function () {

        // USER ROUTES (PROFILE)
        Route::post('/user','UserController@index');
        Route::post('/user-with-api','UserController@api');
        Route::post('/user/update/{id}','UserController@update');
        Route::post('/user/logout', 'AuthController@logout')->name('logout');

        // FILES ROUTES (PROFILE)
        Route::post('/files','FileUploadController@index');
        Route::post('/files-access','FileUploadController@accessed');
        Route::post('/files/upload','FileUploadController@store');
        Route::post('/files/remove','FileUploadController@deleteFiles');
        Route::delete('/files/delete/{id}','FileUploadController@delete');

        // BETA
        Route::post('/files/send_email', 'EmailController@send');
        Route::post('/files/set_access', 'AccessController@access');
        Route::post('/files/download', 'DownloadController@download');
    });

});
