<?php

declare(strict_types=1);

namespace Wallet\User\Infrastructure\Controllers;

use Illuminate\Http\JsonResponse;
use Wallet\User\Application\UserLogoutCase;
use Wallet\User\Domain\Models\User;
use Wallet\User\Infrastructure\Requests\UserLogoutRequest;

final class UserLogoutController
{
    public function __invoke(
        UserLogoutRequest $request,
        UserLogoutCase $uCase,
    ): JsonResponse {
        /** @var User $user */
        $user = $request->user();
        $uCase->__invoke($user);
        return responder()->success()->respond();
    }
}
