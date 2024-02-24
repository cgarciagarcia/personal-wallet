<?php

declare(strict_types=1);

namespace Wallet\User\Infrastructure\Controllers;

use Illuminate\Http\JsonResponse;
use Laravel\Sanctum\NewAccessToken;
use Wallet\User\Application\UserLoginCase;
use Wallet\User\Infrastructure\Requests\UserLoginRequest;

final readonly class UserLoginController
{
    public function __invoke(
        UserLoginRequest $request,
        UserLoginCase $uCase,
    ): JsonResponse {
        $token = $uCase->__invoke($request->toDto());
        return $token instanceof NewAccessToken ?
            responder()->success($token)->respond() :
            responder()->error(401, __('auth.failed'))->respond(401);
    }
}
