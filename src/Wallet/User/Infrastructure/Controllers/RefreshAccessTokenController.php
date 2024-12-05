<?php

declare(strict_types=1);

namespace Wallet\User\Infrastructure\Controllers;

use Illuminate\Http\JsonResponse;
use Wallet\User\Application\RefreshAccessTokenCase;
use Wallet\User\Infrastructure\Requests\RefreshAccessTokenRequest;

final class RefreshAccessTokenController
{
    public function __invoke(
        RefreshAccessTokenRequest $request,
        RefreshAccessTokenCase $uCase,
    ): JsonResponse {
        $token = $uCase->__invoke($request->toDto());

        return responder()->success($token)->respond();
    }
}
