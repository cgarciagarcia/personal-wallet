<?php

declare(strict_types=1);

namespace Wallet\User\Infrastructure\Controllers;

use Illuminate\Http\JsonResponse;
use Wallet\User\Application\RegisterUserCase;
use Wallet\User\Domain\Transformers\UserTransformer;
use Wallet\User\Infrastructure\Requests\RegisterUserRequest;

final class UserRegisterController
{
    /**
     * @throws \Throwable
     */
    public function __invoke(
        RegisterUserRequest $request,
        RegisterUserCase $uCase,
    ): JsonResponse {
        return responder()->success($uCase->__invoke($request->toDto()), UserTransformer::class)->respond();
    }
}
