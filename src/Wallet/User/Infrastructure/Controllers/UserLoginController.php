<?php

declare(strict_types=1);

namespace Wallet\User\Infrastructure\Controllers;

use Illuminate\Http\JsonResponse;
use Wallet\User\Application\UserLoginCase;
use Wallet\User\Infrastructure\Requests\UserLoginRequest;

final readonly class UserLoginController
{
    public function __invoke(
        UserLoginRequest $request,
        UserLoginCase $ucase,
    ): JsonResponse {
        return responder()->success($ucase->__invoke($request->toDto()))->respond();
    }
}
