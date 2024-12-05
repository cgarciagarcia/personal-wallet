<?php

declare(strict_types=1);

namespace Wallet\User\Infrastructure\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Wallet\User\Domain\Dtos\RefreshAccessTokenDto;
use Wallet\User\Domain\Models\User;

final class RefreshAccessTokenRequest extends FormRequest
{
    public function toDto(): RefreshAccessTokenDto
    {
        /** @var User $user */
        $user = $this->user();

        return new RefreshAccessTokenDto(
            user: $user
        );
    }
}
