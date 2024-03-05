<?php

declare(strict_types=1);

namespace Wallet\User\Application;

use Wallet\User\Domain\Dtos\RefreshAccessTokenDto;
use Wallet\User\Domain\Models\AccessTokenAbilityEnum;
use Wallet\User\Domain\Models\PersonalAccessToken;

final class RefreshAccessTokenCase
{
    /**
     * @return string[]
     *
     * @psalm-return array{access_token: string}
     */
    public function __invoke(RefreshAccessTokenDto $dto): array
    {
        InvalidateTokensByUser::execute(
            $dto->user,
            [PersonalAccessToken::SESSION_TOKEN_NAME, ]
        );

        /** @var int $expiration */
        $expiration = config('sanctum.expiration');
        $apiToken = $dto->user->createToken(
            PersonalAccessToken::SESSION_TOKEN_NAME,
            [AccessTokenAbilityEnum::AccessApi->value],
            now()->addMinutes($expiration)
        );

        return [
            'access_token' => $apiToken->plainTextToken,
        ];
    }
}
