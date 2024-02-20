<?php

declare(strict_types=1);

namespace Wallet\Transaction\Infrastructure\Controllers;

use Illuminate\Http\JsonResponse;
use Wallet\Transaction\Application\CreateTransactionCase;
use Wallet\Transaction\Domain\Transformers\TransactionTransformer;
use Wallet\Transaction\Infrastructure\Requests\CreateTransactionRequest;
use Wallet\User\Domain\Models\User;

final readonly class CreateTransactionController
{
    /**
     * @throws \Throwable
     */
    public function __invoke(
        CreateTransactionRequest $request,
        CreateTransactionCase $case,
        User $user,
    ): JsonResponse {
        return responder()
            ->success($case->__invoke(
                $request->toDto(),
                $user
            ), TransactionTransformer::class)
            ->respond();
    }
}
