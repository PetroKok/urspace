<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{env("APP_NAME")}}</title>
    <style>
        html, body{
            height: 100%;
            margin: 0;
        }
        .header{
            height: 70px;
            display: block;
            width: 100%;
            background-color: #7386D5;
            text-align: center;
            font-family: "Bookman Old Style", Courier, monospace;
            font-weight: bold;
        }
        .header a{
            color: white;
            font-size: 25pt;
            display: block;
            padding-top: 10px;
            text-decoration: none;
        }
        .content{
            text-align: center;
            color: gray;
            font-size: 17pt;
            padding-top: 20px;
        }
        .content a{
            text-decoration: none;
            color: black;
        }
    </style>
</head>
<body>
<div class="header">
    <a href="{{env("APP_URL")}}">{{env("APP_NAME")}}</a>
</div>
<div class="content">
    {{$msg}} sent you files. Enjoy <a href="{{env("APP_URL")}}">{{env("APP_NAME")}}</a> platform.
</div>
</body>
</html>