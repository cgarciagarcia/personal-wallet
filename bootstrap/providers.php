<?php

use App\Providers\AppServiceProvider;
use App\Providers\RouteServiceProvider;
use Spatie\Permission\PermissionServiceProvider;

return [
    AppServiceProvider::class,
    RouteServiceProvider::class,
    PermissionServiceProvider::class,
];
