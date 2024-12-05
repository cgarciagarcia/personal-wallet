<?php

declare(strict_types=1);

namespace Wallet\User\Domain\Models;

abstract class RegisterUserFields
{
    public const string NAME = 'name';

    public const string EMAIL = 'email';

    public const string PASSWORD = 'password';

    public const array FIELDS = [
        self::NAME, self::EMAIL, self::PASSWORD,
    ];
}
