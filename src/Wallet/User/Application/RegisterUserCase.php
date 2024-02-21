<?php

declare(strict_types=1);

namespace Wallet\User\Application;

use Illuminate\Auth\Events\Registered;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Throwable;
use Wallet\User\Domain\Dtos\RegisterUserDto;
use Wallet\User\Domain\Models\User;
use Wallet\User\Infrastructure\Events\UserRegistered;

final readonly class RegisterUserCase
{
    /**
     * @api
     */
    public function __construct(
        private Dispatcher $dispatcher,
    ) {
    }

    /**
     * @param  RegisterUserDto  $toDto
     * @return User
     * @throws Throwable
     */
    public function __invoke(RegisterUserDto $toDto): User
    {
        return DB::transaction(function () use ($toDto) {

            $userCreated = new User();
            $userCreated->name = $toDto->name;
            $userCreated->email = $toDto->email;
            $userCreated->password = Hash::make($toDto->password);
            $userCreated->save();

            $this->dispatcher->dispatch(new UserRegistered($userCreated));

            return $userCreated;
        });
    }
}
