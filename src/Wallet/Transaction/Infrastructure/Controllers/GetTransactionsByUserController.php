<?php

declare(strict_types=1);

namespace Wallet\Transaction\Infrastructure\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Wallet\Transaction\Application\GetTransactionsByUserCase;
use Wallet\Transaction\Domain\Transformers\TransactionTransformer;

class GetTransactionsByUserController
{
    public function __invoke(
        Request $request,
        GetTransactionsByUserCase $case,
    ): JsonResponse {
        return responder()
            ->success(
                $case->__invoke($request),
                TransactionTransformer::class
            )
            ->respond();
    }
}
