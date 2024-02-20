<?php

declare(strict_types=1);

namespace Wallet\Transaction\Domain\Models\ValueObjects;

enum RepetitionIntervalEnum: string
{
    case Daily = 'daily';
    case Weekly = 'weekly';
    case Monthly = 'monthly';
    case Annually = 'annually';
}
