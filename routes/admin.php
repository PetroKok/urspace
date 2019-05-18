<?php

use Illuminate\Support\Facades\Route;

Route::auth();

Route::get('/', 'DashboardController@index')->name('dashboard');
