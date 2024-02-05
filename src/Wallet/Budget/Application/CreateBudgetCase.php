<?php

declare(strict_types=1);

namespace Wallet\Budget\Application;

use Illuminate\Support\Facades\DB;
use Throwable;
use Wallet\Budget\Domain\Dtos\CreateBudgetDto;
use Wallet\Budget\Domain\Models\Budget;
use Wallet\Budget\Infrastructure\Events\CreatedBudgetEvent;
use Wallet\User\Domain\Models\BudgetFields;
use Wallet\User\Domain\Models\User;

final class CreateBudgetCase
{
    /**
     * @param  CreateBudgetDto  $dto
     * @param  User  $user
     * @return Budget
     * @throws Throwable
     */
    public function __invoke(CreateBudgetDto $dto, User $user): Budget
    {
        return DB::transaction(function () use ($dto) {
            $budget = new Budget([
                [
                    BudgetFields::NAME => $dto->name,
                    BudgetFields::AMOUNT => $dto->amount,
                ],
            ]);

            CreatedBudgetEvent::dispatch($budget);
            return $budget;
        });
    }
}
