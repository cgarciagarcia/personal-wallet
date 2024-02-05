<?php

declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Wallet\Budget\Infrastructure\Controllers\CreateBudgetController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum', 'prefix' => 'v1'], function () {
    Route::group(['prefix' => '/users/{user_id}'], function () {
        Route::group(['prefix' => '/budget'], function () {
            Route::post('/', CreateBudgetController::class)->name('user.create.budget');
        });
    });
});
