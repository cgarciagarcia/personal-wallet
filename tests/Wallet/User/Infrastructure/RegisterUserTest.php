<?php

declare(strict_types=1);

use Database\Factories\UserFactory;

describe('user registration', function () {
    it('should create a new user and return it', function () {
        $response = $this->postJson('/api/v1/users', [
            'name' => 'Mike',
            'email' => 'my.email@domain.com',
            'password' => 'Password123!',
        ]);

        $response->assertStatus(200);

        $response->assertJson([
            'status' => 200,
            'success' => true,
            'data' => [
                'id' => 1,
                'name' => 'Mike',
                'email' => 'my.email@domain.com',
            ],
        ]);
    });


    it('should not create a new user when email already exists', function () {
        $prevUser = UserFactory::new()->makeOne();
        $prevUser->save();

        $response = $this->postJson('/api/v1/users', [
            'name' => 'Mike',
            'email' => $prevUser->email,
            'password' => 'Password123!',
        ]);

        $response->assertStatus(422);

        $response->assertJson([
            "message" => "The email has already been taken.",
            "errors" => [
                "email" => [
                    "The email has already been taken.",
                ],
            ],
        ]);
    });
});
