<?php

declare(strict_types=1);


namespace Wallet\Transaction\Application;

use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Facades\DB;
use Throwable;
use Wallet\Transaction\Domain\Models\Transaction;
use Wallet\Transaction\Infrastructure\Events\TransactionDeletedEvent;

final readonly class DeleteTransactionCase
{
    /**
     * @api
     */
    public function __construct(private Dispatcher $dispatcher)
    {
    }

    /**
     * @throws Throwable
     */
    public function __invoke(Transaction $transaction): void
    {
        DB::transaction(function () use ($transaction) {
            $transaction->delete();
            $this->dispatcher->dispatch(new TransactionDeletedEvent($transaction));
        });
    }
}
