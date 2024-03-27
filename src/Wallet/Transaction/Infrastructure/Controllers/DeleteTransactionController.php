<?php

declare(strict_types=1);


namespace Wallet\Transaction\Infrastructure\Controllers;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;
use Wallet\Transaction\Application\DeleteTransactionCase;
use Wallet\Transaction\Domain\Models\Transaction;
use Wallet\Transaction\Infrastructure\Requests\DeleteTransactionRequest;

final readonly class DeleteTransactionController
{
    /**
     * @throws Throwable
     */
    public function __invoke(
        DeleteTransactionRequest $request,
        DeleteTransactionCase $case,
        Transaction $transaction,
    ): JsonResponse {
        $case->__invoke($transaction);
        return responder()->success()->respond(Response::HTTP_NO_CONTENT);
    }
}
