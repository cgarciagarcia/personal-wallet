<?php

declare(strict_types=1);

namespace Wallet\User\Domain\Dtos;

use Wallet\User\Domain\Models\User;

final readonly class RefreshAccessTokenDto
{
    public function __construct(public User $user)
    {
    }
}
