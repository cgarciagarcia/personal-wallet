<?php

declare(strict_types=1);

namespace Wallet\Transaction\Domain\Models\ValueObjects;

enum FlowTypeEnum: string
{
    case Inflow = 'inflows';
    case Outflow = 'outflows';
}
