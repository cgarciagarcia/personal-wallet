<?php

declare(strict_types=1);

namespace Wallet\User\Infrastructure\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Wallet\User\Domain\Dtos\UserLoginDto;

final class UserLoginRequest extends FormRequest
{
    /**
     * @api
     *
     * @return string[][]
     *
     * @psalm-return array{email: list{'required', 'email'}, password: list{'required'}}
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ];
    }

    public function toDto(): UserLoginDto
    {
        return new UserLoginDto(
            email: $this->str('email')->toString(),
            password: $this->str('password')->toString(),
        );
    }
}
