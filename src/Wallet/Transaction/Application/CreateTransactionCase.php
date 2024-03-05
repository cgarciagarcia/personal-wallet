<?php

declare(strict_types=1);

namespace Wallet\Transaction\Application;

use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\DB;
use Throwable;
use Wallet\Transaction\Domain\Dtos\CreateTransactionDto;
use Wallet\Transaction\Domain\Models\Transaction;
use Wallet\Transaction\Infrastructure\Events\CreatedTransactionEvent;

final readonly class CreateTransactionCase
{
    /**
     * @psalm-api
     */
    public function __construct(private Dispatcher $dispatcher)
    {
    }

    /**
     *
     *
     *
     * @throws Throwable
     */
    public function __invoke(CreateTransactionDto $dto): Transaction
    {
        $dispatcher = $this->dispatcher;
        return DB::transaction(function () use ($dto, $dispatcher) {
            $transaction = new Transaction();
            $transaction->date = $dto->date;
            $transaction->money = $dto->amount;
            $transaction->type = $dto->type;
            $transaction->category_id = $dto->category;
            $transaction->description = $dto->description;
            $transaction->recurring = $dto->recurring;
            $transaction->repetition_count = $dto->repetition;
            $transaction->repetition_remaining = $dto->repetition;
            $transaction->interval = $dto->interval;
            $transaction->user_id = $dto->user->id;
            $transaction->save();

            $dispatcher->dispatch(new CreatedTransactionEvent($transaction));
            return $transaction;
        });
    }
}
