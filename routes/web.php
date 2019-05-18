<?php

use Illuminate\Support\Facades\Route;

Route::post('/signature/download/{slug}', 'RemoteAccessController@download');
Route::post('/signature/upload', 'RemoteAccessController@upload');

Route::get('/image/{slug}', 'ImageController@index');

Route::get('/{path?}', [
    'uses' => 'ReactController@show',
    'as' => 'react',
    'where' => ['path' => '.*']
]);

