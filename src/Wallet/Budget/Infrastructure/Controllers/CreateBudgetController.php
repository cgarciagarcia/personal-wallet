<?php

declare(strict_types=1);

namespace Wallet\Budget\Infrastructure\Controllers;

use Illuminate\Http\JsonResponse;
use Throwable;
use Wallet\Budget\Application\CreateBudgetCase;
use Wallet\Budget\Infrastructure\Requests\CreateBudgetRequest;
use Wallet\User\Domain\Models\User;

final class CreateBudgetController
{

    /**
     * @throws Throwable
     */
    public function __invoke(
        CreateBudgetRequest $request,
        CreateBudgetCase $useCase,
        User $user,
    ): JsonResponse {
        $result = $useCase->__invoke($request->toDto(), $user);
        return responder()->success($result)->respond();
    }
}
