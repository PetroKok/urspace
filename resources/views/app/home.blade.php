@extends('app.layouts.app')

@push("styles")
    <link rel="stylesheet" href="/css/profile/style4.css">
    <link rel="stylesheet" href="/css/react-notify.css">

    <!-- Font Awesome JS -->
    <script type="text/javascript" src="/js/solid.js"></script>
    <script type="text/javascript" src="/js/fontawesome.js"></script>

@endpush

@push('scripts')
    <script type="text/javascript" src="/js/pages/profile.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
        });
    </script>
@endpush