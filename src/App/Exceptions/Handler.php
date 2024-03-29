<?php

declare(strict_types=1);

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\Exceptions\MissingAbilityException;
use Sentry\Laravel\Integration;
use Symfony\Component\HttpFoundation\Response as ResponseSymfony;
use Throwable;
use Wallet\User\Domain\Exceptions\FailedLoginException;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * RegisterPage the exception handling callbacks for the application.
     */
    #[\Override]
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            if (config('sentry.dsn')) {
                Integration::captureUnhandledException($e);
            }
        });
    }

    public function render($request, Throwable $e): Response|JsonResponse|RedirectResponse|ResponseSymfony
    {
        if ($e instanceof MissingAbilityException) {
            return responder()->error(403, (string) __('auth.missing_ability'))->respond(403);
        }

        if ($e instanceof AuthenticationException) {
            return responder()->error(401, (string) __('auth.unauthenticated'))->respond(401);
        }

        if ($e instanceof FailedLoginException) {
            return responder()->error(422, (string) __('auth.failed'))->respond(422);
        }

        if ($e instanceof ValidationException) {
            return responder()->error($e->status, $e->getMessage())->data([
                'detail' => $e->errors(),
            ])->respond(422);
        }

        return parent::render($request, $e);
    }
}
