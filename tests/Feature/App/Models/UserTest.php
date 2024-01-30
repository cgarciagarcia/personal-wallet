<?php

declare(strict_types=1);


use App\Models\User;
use Database\Factories\UserFactory;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('user factory should create a user', function () {
    $user = UserFactory::new()->create();


    expect($user)->toBeInstanceOf(User::class)
        ->and($user)->toExist();
});
