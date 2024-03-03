<?php

declare(strict_types=1);

namespace Wallet\User\Application;

use Illuminate\Database\Eloquent\Collection;
use Wallet\User\Domain\Models\PersonalAccessToken;
use Wallet\User\Domain\Models\User;

final readonly class InvalidateTokensByUser
{
    public static function execute(User $user, array $tokensNames): void
    {
        // Revoke all previous tokens
        /** @var Collection<int, PersonalAccessToken> $previousTokens */
        $previousTokens = $user->tokens()
            ->where('expires_at', '>=', now())
            ->whereIn('name', $tokensNames)
            ->orwhereNull('expires_at')
            ->get();
        $previousTokens->map(fn(PersonalAccessToken $token) => $token->revoke());
    }
}
