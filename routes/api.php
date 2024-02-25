<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Wallet\Budget\Infrastructure\Controllers\CreateBudgetController;
use Wallet\Transaction\Infrastructure\Controllers\CreateTransactionController;
use Wallet\Transaction\Infrastructure\Controllers\GetTransactionsByUserController;
use Wallet\User\Domain\Models\AccessTokenAbilityEnum;
use Wallet\User\Infrastructure\Controllers\UserLoginController;
use Wallet\User\Infrastructure\Controllers\UserRegisterController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::group(['prefix' => '/v1'], function () {

    Route::post('/users', UserRegisterController::class)->name('user.register');
    Route::post('login', UserLoginController::class)->name('user.login');

    Route::middleware([
        'auth:sanctum',
        'ability:'.AccessTokenAbilityEnum::AccessApi->value,
    ])->group(function () {
        Route::group(['prefix' => '/users/{user}'], function () {

            Route::group(['prefix' => '/budget'], function () {
                Route::post('/', CreateBudgetController::class)->name('user.create.budget');
            });
        });

        Route::get('/transactions', GetTransactionsByUserController::class)->name('user.get.transactions');
        Route::post('/transactions', CreateTransactionController::class)->name('user.create.transaction');
    });
});
