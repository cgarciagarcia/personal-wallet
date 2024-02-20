<?php

declare(strict_types=1);

namespace Wallet\Transaction\Infrastructure\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Wallet\Transaction\Application\GetTransactionsByUserCase;
use Wallet\Transaction\Domain\Transformers\TransactionTransformer;
use Wallet\User\Domain\Models\User;

class GetTransactionsByUserController
{
    public function __invoke(
        Request $request,
        GetTransactionsByUserCase $case,
        User $user,
    ): JsonResponse {
        return responder()->success($case->__invoke($request, $user), TransactionTransformer::class)
            ->respond();
    }
}
