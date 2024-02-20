<?php

declare(strict_types=1);

namespace Wallet\Transaction\Domain\Models;

abstract class TransactionFields
{
    public const MONEY = "money";
    public const TYPE = "type";
    public const USER_ID = "user_id";
    public const DATE = "date";
    public const CATEGORY_ID = "category_id";
    public const RECURRING = "recurring";
    public const REPETITION_COUNT = "repetition_count";
    public const INTERVAL = "interval";
    public const REPETITION_REMAINING = "repetition_remaining";
    public const NEXT_CHARGE_DATE = "next_charge_date";
    public const DESCRIPTION = "description";


    public const FILLABLE = [
        self::TYPE,
        self::MONEY,
        self::DESCRIPTION,
        self::CATEGORY_ID,
        self::DATE,
        self::RECURRING,
        self::REPETITION_COUNT,
        self::USER_ID,
        self::INTERVAL,
        self::REPETITION_REMAINING,
        self::NEXT_CHARGE_DATE,
    ];
}
