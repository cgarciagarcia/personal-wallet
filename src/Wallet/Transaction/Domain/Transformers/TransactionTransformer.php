<?php

declare(strict_types=1);

namespace Wallet\Transaction\Domain\Transformers;

use League\Fractal\TransformerAbstract;
use Wallet\Transaction\Domain\Models\Transaction;

class TransactionTransformer extends TransformerAbstract
{
    /**
     *
     * @return (\Akaunting\Money\Money|\Illuminate\Support\Carbon|\Wallet\Transaction\Domain\Models\ValueObjects\FlowTypeEnum|bool|int|null|string)[]
     *
     * @psalm-api
     *
     * @psalm-return array{id: int, date: \Illuminate\Support\Carbon, money: \Akaunting\Money\Money, type: \Wallet\Transaction\Domain\Models\ValueObjects\FlowTypeEnum, category_id: int|null, description: string, recurring: bool}
     */
    public function transform(Transaction $transaction): array
    {
        return [
            'id' => $transaction->id,
            'date' => $transaction->date,
            'money' => $transaction->money,
            'type' => $transaction->type,
            'category_id' => $transaction->category_id,
            'description' => $transaction->description,
            'recurring' => $transaction->recurring,
        ];
    }
}
