<?php

declare(strict_types=1);

namespace Wallet\User\Application;

use Illuminate\Support\Facades\Auth;
use Wallet\User\Domain\Dtos\UserLoginDto;
use Wallet\User\Domain\Exceptions\FailedLoginException;
use Wallet\User\Domain\Models\AccessTokenAbilityEnum;
use Wallet\User\Domain\Models\PersonalAccessToken;
use Wallet\User\Domain\Models\User;

final readonly class UserLoginCase
{
    /**
     * @return string[]
     *
     * @throws \Throwable
     *
     * @psalm-return array{access_token: string, refresh_token: string}
     */
    public function __invoke(UserLoginDto $dto, ): array|null
    {
        throw_if(
            ! Auth::validate(['email' => $dto->email, 'password' => $dto->password, ]),
            new FailedLoginException(__('auth.unauthenticated'))
        );

        /** @var User $user */
        $user = User::whereEmail($dto->email)->firstOrFail();
        InvalidateTokensByUser::execute(
            $user,
            [PersonalAccessToken::SESSION_TOKEN_NAME, PersonalAccessToken::REFRESH_TOKEN_NAME]
        );

        /** @var int $rt_expiration */
        $rt_expiration = config('sanctum.rt_expiration');
        $refreshToken = $user->createToken(
            PersonalAccessToken::REFRESH_TOKEN_NAME,
            [AccessTokenAbilityEnum::IssueAccessToken->value],
            now()->addMinutes($rt_expiration)
        );

        /** @var int $expiration */
        $expiration = config('sanctum.expiration');
        $apiToken = $user->createToken(
            PersonalAccessToken::SESSION_TOKEN_NAME,
            [AccessTokenAbilityEnum::AccessApi->value],
            now()->addMinutes($expiration)
        );

        return [
            'access_token' => $apiToken->plainTextToken,
            'refresh_token' => $refreshToken->plainTextToken,
        ];
    }
}
