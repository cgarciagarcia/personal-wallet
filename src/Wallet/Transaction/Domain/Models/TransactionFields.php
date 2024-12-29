<?php

declare(strict_types=1);

namespace Wallet\Transaction\Domain\Models;

abstract class TransactionFields
{
    public const string ID = 'id';

    public const string MONEY = 'money';

    public const string TYPE = 'type';

    public const string USER_ID = 'user_id';

    public const string DATE = 'date';

    public const string CATEGORY_ID = 'category_id';

    public const string RECURRING = 'recurring';

    public const string REPETITION_COUNT = 'repetition_count';

    public const string INTERVAL = 'interval';

    public const string REPETITION_REMAINING = 'repetition_remaining';

    public const string NEXT_CHARGE_DATE = 'next_charge_date';

    public const string DESCRIPTION = 'description';
}
