<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Wallet\Budget\Infrastructure\Controllers\CreateBudgetController;
use Wallet\Transaction\Infrastructure\Controllers\CreateTransactionController;
use Wallet\Transaction\Infrastructure\Controllers\DeleteTransactionController;
use Wallet\Transaction\Infrastructure\Controllers\GetTransactionsByUserController;
use Wallet\Transaction\Infrastructure\Controllers\UpdateTransactionController;
use Wallet\User\Domain\Models\AccessTokenAbilityEnum;
use Wallet\User\Infrastructure\Controllers\RefreshAccessTokenController;
use Wallet\User\Infrastructure\Controllers\UserLoginController;
use Wallet\User\Infrastructure\Controllers\UserLogoutController;
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


/*
 * --------------------------------------------------------------------------
 * UNPROTECTED ROUTES
 * --------------------------------------------------------------------------
 */
Route::post('/users', UserRegisterController::class)->name('user.register');
Route::post('/login', UserLoginController::class)->name('user.login');
/*
 * --------------------------------------------------------------------------
 * REFRESH ROUTES
 * --------------------------------------------------------------------------
 */
Route::group([
    'middleware' => [
        'auth:sanctum',
        'ability:'.AccessTokenAbilityEnum::IssueAccessToken->value,
    ],
], function () {
    Route::post('/refresh-access-token', RefreshAccessTokenController::class)->name('user.token.refresh');
});

/*
 * --------------------------------------------------------------------------
 * PROTECTED ROUTES VIA TOKEN
 * --------------------------------------------------------------------------
 */
Route::group(['middleware' => ['auth:sanctum', 'ability:'.AccessTokenAbilityEnum::AccessApi->value,]], function () {
    Route::delete('/logout', UserLogoutController::class)->name('user.logout');
    Route::post('/users/{user}/budget', CreateBudgetController::class)->name('user.create.budget');
    Route::get('/transactions', GetTransactionsByUserController::class)->name('user.transactions.get');
    Route::post('/transactions', CreateTransactionController::class)->name('user.transaction.create');
    Route::delete('/transactions/{transaction}', DeleteTransactionController::class)->name('user.transaction.delete');
    Route::put('transactions/{transaction}', UpdateTransactionController::class)->name('user.transaction.update');
});
