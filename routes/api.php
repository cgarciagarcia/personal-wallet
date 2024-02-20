<?php

declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Wallet\Budget\Infrastructure\Controllers\CreateBudgetController;
use Wallet\Transaction\Infrastructure\Controllers\CreateTransactionController;
use Wallet\Transaction\Infrastructure\Controllers\GetTransactionsByUserController;

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


Route::group([ /*'middleware' => 'auth:sanctum',*/ 'prefix' => '/v1'], function () {
    Route::group(['prefix' => '/users/{user}'], function () {
        Route::group(['prefix' => '/budget'], function () {
            Route::post('/', CreateBudgetController::class)->name('user.create.budget');
        });
        Route::get('/transactions', GetTransactionsByUserController::class)->name('user.get.transactions');
        Route::post('/transactions', CreateTransactionController::class)->name('user.create.transaction');
    });
});
