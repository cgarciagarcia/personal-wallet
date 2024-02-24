<?php

declare(strict_types=1);

namespace Wallet\User\Application;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\NewAccessToken;
use Wallet\User\Domain\Dtos\UserLoginDto;
use Wallet\User\Domain\Models\PersonalAccessToken;
use Wallet\User\Domain\Models\User;

final readonly class UserLoginCase
{
    public function __invoke(UserLoginDto $dto, ): ?NewAccessToken
    {
        $user = User::whereEmail($dto->email)->first();
        if (Auth::validate(['email' => $dto->email, 'password' => $dto->password, ]) && $user) {
            // Revoke all previous tokens
            /** @var Collection<int, PersonalAccessToken> $previousTokens */
            $previousTokens = $user->tokens()->get();
            $previousTokens->map(fn(PersonalAccessToken $token) => $token->revoke());
            return $user->createToken('session', ['*']);
        } else {
            return null;
        }
    }
}
