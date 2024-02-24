<?php

declare(strict_types=1);

namespace Wallet\User\Domain\Dtos;

final readonly class UserLoginDto
{
    public function __construct(public string $email, public string $password)
    {
    }
}
