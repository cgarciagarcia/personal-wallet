<?php


declare(strict_types=1);

namespace Wallet\Budget\Domain\Dtos;

final class CreateBudgetDto
{
    public function __construct(
        public string $name,
        public string $amount,
    ){

    }
}
