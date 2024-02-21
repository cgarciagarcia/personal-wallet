<?php

declare(strict_types=1);

namespace Wallet\Budget\Application;

use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\DB;
use Throwable;
use Wallet\Budget\Domain\Dtos\CreateBudgetDto;
use Wallet\Budget\Domain\Models\Budget;
use Wallet\Budget\Domain\Models\BudgetFields;
use Wallet\Budget\Infrastructure\Events\CreatedBudgetEvent;
use Wallet\User\Domain\Models\User;

final readonly class CreateBudgetCase
{
    /**
     * @psalm-api
     */
    public function __construct(private Dispatcher $dispatcher)
    {
    }

    /**
     *
     * @throws Throwable
     */
    public function __invoke(CreateBudgetDto $dto, User $user): Budget
    {
        $dispatcher = $this->dispatcher;
        return DB::transaction(function () use ($dto, $user, $dispatcher) {
            $budget = new Budget([
                [
                    BudgetFields::NAME => $dto->name,
                    BudgetFields::AMOUNT => $dto->amount,
                    BudgetFields::USER_ID => $user->id,
                ],
            ]);
            $budget->save();

            $dispatcher->dispatch(new CreatedBudgetEvent($budget));
            return $budget;
        });
    }
}
