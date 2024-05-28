<?php

declare(strict_types=1);


namespace Wallet\Transaction\Application;

use Illuminate\Support\Facades\DB;
use Throwable;
use Wallet\Transaction\Domain\Dtos\UpdateTransactionDto;
use Wallet\Transaction\Domain\Models\Transaction;

final readonly class UpdateTransactionCase
{
    /**
     * @throws Throwable
     */
    public function __invoke(
        Transaction $transaction,
        UpdateTransactionDto $dto,
    ): Transaction {
        return DB::transaction(function () use ($dto, $transaction) {
            $transaction->type = $dto->type;
            $transaction->date = $dto->date;
            $transaction->money = $dto->amount;
            $transaction->description = $dto->description;
            $transaction->category_id = $dto->category;
            $transaction->recurring = $dto->recurring;
            $transaction->repetition_count = $dto->repetition;
            $transaction->repetition_remaining = $dto->repetition;
            $transaction->interval = $dto->interval;
            $transaction->user_id = $dto->user->id;
            $transaction->save();

            return $transaction;
        });
    }
}
