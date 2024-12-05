<?php

declare(strict_types=1);


namespace Wallet\Transaction\Domain\Dtos;

use Akaunting\Money\Money;
use Illuminate\Support\Carbon;
use Wallet\Transaction\Domain\Models\ValueObjects\FlowTypeEnum;
use Wallet\Transaction\Domain\Models\ValueObjects\RepetitionIntervalEnum;
use Wallet\User\Domain\Models\User;

final readonly class UpdateTransactionDto
{
    public function __construct(
        public Money $amount,
        public FlowTypeEnum $type,
        public Carbon $date,
        public int|null $category,
        public bool $recurring,
        public string $description,
        public RepetitionIntervalEnum|null $interval,
        public User $user,
        public int $repetition = 0,
    ) {
    }
}
