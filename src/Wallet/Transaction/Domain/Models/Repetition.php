<?php

declare(strict_types=1);

namespace Wallet\Transaction\Domain\Models;

use Wallet\Transaction\Domain\Models\ValueObjects\RepetitionIntervalEnum;

final class Repetition
{
    public function __construct(protected int $count, protected RepetitionIntervalEnum $interval)
    {
    }
}
