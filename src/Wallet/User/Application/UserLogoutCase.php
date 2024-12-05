<?php

declare(strict_types=1);

namespace Wallet\User\Application;

use Illuminate\Database\Eloquent\Collection;
use Wallet\User\Domain\Models\PersonalAccessToken;
use Wallet\User\Domain\Models\User;

final class UserLogoutCase
{
    public function __invoke(User $user): void
    {
        /** @var Collection<int, PersonalAccessToken> $tokens */
        $tokens = $user->tokens()->where('expires_at', '>=', now())->get();
        $tokens->each(fn (PersonalAccessToken $token) => $token->revoke());
    }
}
