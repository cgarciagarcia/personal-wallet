<?php

declare(strict_types=1);

namespace Wallet\User\Application;

use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\NewAccessToken;
use Wallet\User\Domain\Dtos\UserLoginDto;
use Wallet\User\Domain\Models\User;

final readonly class UserLoginCase
{
    public function __invoke(UserLoginDto $dto,): ?NewAccessToken
    {
        $user = User::whereEmail($dto->email)->first();
        if (Auth::validate(['email' => $dto->email, 'password' => $dto->password,]) && $user) {
            // Revoke all previous tokens
            $user->tokens()->delete();
            return $user->createToken('session', ['*'], now()->addHours(3));
        } else {
            return null;
        }
    }
}
