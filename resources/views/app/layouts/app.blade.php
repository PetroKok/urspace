<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

{{--    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">--}}

    <link rel="icon" href="/img/fav.png" type="image/gif">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'URSPACE') }}</title>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
    <!-- Styles -->
    <link href="/css/app.css" rel="stylesheet">
    @stack('styles')
</head>
<body>
    <div id="root"></div>
    @yield('content')
</body>
@stack('scripts')
</html>
