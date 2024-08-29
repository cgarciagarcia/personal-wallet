<?php

declare(strict_types=1);

namespace Wallet\Transaction\Application;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use Wallet\Transaction\Domain\Models\Transaction;
use Wallet\Transaction\Domain\Models\TransactionFields;
use Wallet\User\Domain\Models\User;

final class GetTransactionsByUserCase
{
    /**
     * @return Collection<int, Transaction>
     */
    public function __invoke(Request $request): Collection
    {
        /** @var User $user */
        $user = $request->user();

        /** @var Builder<Transaction> $query */
        $query = Transaction::whereUserId($user->id)->with('user');

        /** @var Collection<int, Transaction> $transactions */
        $transactions = QueryBuilder::for($query)
        ->allowedFilters([
            AllowedFilter::scope('between_dates'),
            AllowedFilter::scope('month'),
            AllowedFilter::scope('date'),
        ])
        ->allowedSorts(TransactionFields::DATE)
        ->defaultSorts(['-' . TransactionFields::DATE])
        ->get();

        return $transactions;
    }
}
