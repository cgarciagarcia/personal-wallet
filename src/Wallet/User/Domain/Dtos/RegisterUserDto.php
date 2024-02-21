<?php

declare(strict_types=1);

namespace Wallet\User\Domain\Dtos;

final readonly class RegisterUserDto
{

    public function __construct(
        public string $name,
        public string $email,
        public string $password,
    ) {
    }
}
