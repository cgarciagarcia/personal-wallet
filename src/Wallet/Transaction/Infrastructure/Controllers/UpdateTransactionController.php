<?php

declare(strict_types=1);

namespace Wallet\Transaction\Infrastructure\Controllers;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Throwable;
use Wallet\Transaction\Application\UpdateTransactionCase;
use Wallet\Transaction\Domain\Models\Transaction;
use Wallet\Transaction\Domain\Transformers\TransactionTransformer;
use Wallet\Transaction\Infrastructure\Requests\UpdateTransactionRequest;

final readonly class UpdateTransactionController
{
    /**
     *
     *
     * @throws Throwable
     *
     * @api
     */
    public function __invoke(
        UpdateTransactionRequest $request,
        UpdateTransactionCase $case,
        Transaction $transaction,
    ): JsonResponse {
        $updatedTransaction = $case->__invoke($transaction, $request->toDto());
        return responder()->success(
            $updatedTransaction,
            TransactionTransformer::class
        )->respond(ResponseAlias::HTTP_OK);
    }
}
