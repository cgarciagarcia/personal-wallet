<?php

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Laravel application instance
| which serves as the "glue" for all the components of Laravel, and is
| the IoC container for the system binding all of the various parts.
|
*/

use App\LaravelApp;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\Exceptions\MissingAbilityException;
use Sentry\Laravel\Integration;
use Wallet\User\Domain\Exceptions\FailedLoginException;

return LaravelApp::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->append([
            \App\Http\Middleware\TrustProxies::class,
            \Illuminate\Http\Middleware\HandleCors::class,
            \App\Http\Middleware\PreventRequestsDuringMaintenance::class,
            \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
            \App\Http\Middleware\TrimStrings::class,
            \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
        ]);
        $middleware->group('web', [
                \App\Http\Middleware\EncryptCookies::class,
                \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
                \Illuminate\Session\Middleware\StartSession::class,
                \Illuminate\View\Middleware\ShareErrorsFromSession::class,
                \App\Http\Middleware\VerifyCsrfToken::class,
                \Illuminate\Routing\Middleware\SubstituteBindings::class,
            ]);
        $middleware->group('web', [
                \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
                \Illuminate\Routing\Middleware\ThrottleRequests::class . ':api',
                \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);

        $middleware->alias([
           'auth' => \App\Http\Middleware\Authenticate::class,
           'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
           'auth.session' => \Illuminate\Session\Middleware\AuthenticateSession::class,
           'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
           'can' => \Illuminate\Auth\Middleware\Authorize::class,
           'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
           'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
           'precognitive' => \Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests::class,
           'signed' => \App\Http\Middleware\ValidateSignature::class,
           'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
           'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
           'abilities' => \Laravel\Sanctum\Http\Middleware\CheckAbilities::class,
           'ability' => \Laravel\Sanctum\Http\Middleware\CheckForAnyAbility::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->reportable(function (Throwable $e) {
            if (config('sentry.dsn')) {
                Integration::captureUnhandledException($e);
            }
        });

        $exceptions->render(fn(MissingAbilityException $exception, $request) =>
        responder()->error(403, (string)__('auth.missing_ability'))->respond(403));

        $exceptions->render(fn(AuthenticationException $exception, $request) =>
        responder()->error(401, (string)__('auth.unauthenticated'))->respond(401));

        $exceptions->render(fn(FailedLoginException $exception, $request) =>
        responder()->error(422, (string)__('auth.failed'))->respond(422));

        $exceptions->render(fn(ValidationException $exception, $request) =>
        responder()->error($exception->status, $exception->getMessage())->data([
            'detail' => $exception->errors(),
        ])->respond(422));
    })->create();
