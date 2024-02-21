<?php

declare(strict_types=1);

namespace Wallet\User\Infrastructure\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Wallet\User\Domain\Dtos\RegisterUserDto;
use Wallet\User\Domain\Models\RegisterUserFields;

final class RegisterUserRequest extends FormRequest
{
    /**
     * @return (Password|string)[][]
     *
     * @api
     *
     * @psalm-return array{name: list{'required', 'string', 'max:255'}, email: list{'required', 'email', 'unique:users'}, password: list{Password}}
     */
    public function rules(): array
    {
        return [
            RegisterUserFields::NAME => ['required', 'string', 'max:255'],
            RegisterUserFields::EMAIL => ['required', 'email', 'unique:users'],
            RegisterUserFields::PASSWORD => [
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->max(255),
            ],
        ];
    }

    public function toDto(): RegisterUserDto
    {
        return new RegisterUserDto(
            name: $this->str(RegisterUserFields::NAME)->toString(),
            email: $this->str(RegisterUserFields::EMAIL)->toString(),
            password: $this->str(RegisterUserFields::PASSWORD)->toString()
        );
    }
}
