<?php

declare(strict_types=1);

namespace Wallet\Transaction\Domain\Models\ValueObjects;

enum FlowTypeEnum: string
{
    case Income = 'income';
    case Outcome = 'outcome';
}
