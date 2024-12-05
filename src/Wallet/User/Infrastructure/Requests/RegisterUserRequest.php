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
     * @psalm-return array{name: list{'required', 'string', 'max:255'}, email: list{'required', 'email', 'unique:users'}, password: list{'required', Password}, confirmation_password: list{'required', 'same:password'}}
     */
    public function rules(): array
    {
        return [
            RegisterUserFields::NAME => ['required', 'string', 'max:255'],
            RegisterUserFields::EMAIL => ['required', 'email', 'unique:users'],
            RegisterUserFields::PASSWORD => [
                'required',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->max(255),
            ],
            'confirmation_password' => ['required', 'same:' . RegisterUserFields::PASSWORD],
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
