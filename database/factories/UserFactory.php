<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Wallet\User\Domain\Models\User;

/**
 * @extends Factory<User>
 * @psalm-api
 */
class UserFactory extends Factory
{
    /**
     * @var class-string<User>
     * @psalm-var mixed
     * @phpstan-var class-string<User>
     */
    protected $model = User::class;

    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     *
     * @psalm-return array{name: string, email: string, email_verified_at: Carbon, password: string, remember_token: string}
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }
}
