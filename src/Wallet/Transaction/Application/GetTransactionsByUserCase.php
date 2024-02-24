<?php

declare(strict_types=1);

namespace Wallet\Transaction\Application;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Wallet\User\Domain\Models\User;

final class GetTransactionsByUserCase
{
    /**
     * @psalm-return Collection<int, \Wallet\Transaction\Domain\Models\Transaction>
     */
    public function __invoke(Request $request): Collection
    {
        /** @var User $user */
        $user = $request->user();
        return $user->transactions()->get();
    }
}
