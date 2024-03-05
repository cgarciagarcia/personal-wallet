<?php

declare(strict_types=1);

namespace Support\Controllers;

use Illuminate\Support\Facades\View;

final class AppController
{
    public function __invoke(): \Illuminate\Contracts\View\View
    {
        return View::make('app');
    }
}
