<?php

declare(strict_types=1);

namespace Wallet\Budget\Domain\Models;

abstract class BudgetFields
{
    public const ID = 'id';
    public const USER_ID = 'user_id';
    public const AMOUNT = 'amount';
    public const NAME = 'name';
    public const FILLABLE = [
        self::AMOUNT, self::USER_ID, self::NAME,
    ];
}
