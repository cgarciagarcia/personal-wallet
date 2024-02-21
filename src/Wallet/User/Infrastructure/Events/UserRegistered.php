<?php

declare(strict_types=1);

namespace Wallet\User\Infrastructure\Events;

use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Wallet\User\Domain\Models\User;

/**
 * @api
 */
final readonly class UserRegistered implements ShouldDispatchAfterCommit
{
    public function __construct(public User $user)
    {
    }
}
