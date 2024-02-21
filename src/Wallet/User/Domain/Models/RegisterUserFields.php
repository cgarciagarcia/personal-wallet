<?php

declare(strict_types=1);

namespace Wallet\User\Domain\Models;

abstract class RegisterUserFields
{
    public const NAME = 'name';
    public const EMAIL = 'email';
    public const PASSWORD = 'password';
    public const FIELDS = [
        self::NAME, self::EMAIL, self::PASSWORD,
    ];
}
