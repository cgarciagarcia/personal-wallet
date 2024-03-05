<?php

declare(strict_types=1);


use Database\Factories\UserFactory;

describe('Login test', function () {
    it('should return a token', function () {
        $user = UserFactory::new()->makeOne();
        $user->save();

        $response = $this->postJson('/api/v1/login', [
            'email' => $user->email,
            'password' => 'Password123!',
        ]);

        $response->assertOk();
        $response->assertJsonStructure([
            'status',
            'success',
            'data' => [
                'access_token',
                'refresh_token',
            ],
        ]);
    });

    it('should return a unauthorized error', function () {
        $user = UserFactory::new()->makeOne();
        $user->save();

        $response = $this->postJson('/api/v1/login', [
            'email' => $user->email,
            'password' => 'WrongPassword!',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonStructure([
            'status',
            'success',
            'error' => [
                'code',
                'message',
            ],
        ]);
    });


    it('should login and invalidate previous tokens', function () {
        $user = UserFactory::new()->makeOne();
        $user->save();

        $response = $this->postJson('/api/v1/login', [
            'email' => $user->email,
            'password' => 'Password123!',
        ]);

        $response->assertOk();

        $response2 = $this->postJson('/api/v1/login', [
            'email' => $user->email,
            'password' => 'Password123!',
        ]);
        $response2->assertOk();


        $this->assertEquals(2, $user->tokens()->count());
    });
});
