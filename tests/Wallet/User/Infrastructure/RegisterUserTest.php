<?php

declare(strict_types=1);

use Database\Factories\UserFactory;
use function Pest\Laravel\postJson;

describe('user registration', function () {
    it('should create a new user and return it', function () {
        $response = postJson('/api/v1/users', [
            'name' => 'Mike',
            'email' => 'my.email@domain.com',
            'password' => 'Password123!',
            'confirmation_password' => 'Password123!',
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

        $response = postJson('/api/v1/users', [
            'name' => 'Mike',
            'email' => $prevUser->email,
            'password' => 'Password123!',
            'confirmation_password' => 'Password123!',
        ]);

        $response->assertStatus(422);

        $response->assertJson([
            'success' => false,
            'status' => 422,
            'error' => [
                'code' => 422,
                'message' => 'The email has already been taken.',
                'detail' => [
                    'email' => [
                        'The email has already been taken.',
                    ],
                ],
            ],
        ]);
    });

    it('should not create a new user when all fields are empty.', function () {
        $response = postJson('/api/v1/users', []);

        $response->assertStatus(422);

        $response->assertJson([
            'success' => false,
            'status' => 422,
            'error' => [
                'code' => 422,
                'message' => 'The name field is required. (and 3 more errors)',
                'detail' => [
                    'name' => [
                        'The name field is required.',
                    ],
                    'email' => [
                        'The email field is required.',
                    ],
                    'password' => [
                        'The password field is required.',
                    ],
                    'confirmation_password' => [
                        'The confirmation password field is required.',
                    ],
                ],
            ],
        ]);
    });
});
