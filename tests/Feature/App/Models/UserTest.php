<?php

declare(strict_types=1);


use Database\Factories\UserFactory;
use Wallet\User\Domain\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('user factory should create a user', function () {
    $user = UserFactory::new()->create();


    expect($user)->toBeInstanceOf(User::class)
        ->and($user)->toExist();
});
