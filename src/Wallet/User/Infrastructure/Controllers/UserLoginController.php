<?php

declare(strict_types=1);

namespace Wallet\User\Infrastructure\Controllers;

use Illuminate\Http\JsonResponse;
use Throwable;
use Wallet\User\Application\UserLoginCase;
use Wallet\User\Infrastructure\Requests\UserLoginRequest;

final readonly class UserLoginController
{
    /**
     * @throws Throwable
     */
    public function __invoke(
        UserLoginRequest $request,
        UserLoginCase $uCase,
    ): JsonResponse {
        $token = $uCase->__invoke($request->toDto());
        return responder()->success($token)->respond();
    }
}
