<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Wallet\Budget\Infrastructure\Events\CreatedBudgetEvent;
use Wallet\Transaction\Infrastructure\Events\CreatedTransactionEvent;
use Wallet\Transaction\Infrastructure\MakeLogOnCreatedTransactionListener;
use Wallet\User\Infrastructure\Events\UserRegistered;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<string, array<int, string>>
     */
    protected $listen = [
        UserRegistered::class => [

        ],
        CreatedBudgetEvent::class => [
        ],
        CreatedTransactionEvent::class => [
            MakeLogOnCreatedTransactionListener::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    #[\Override]
    public function boot(): void
    {
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return false
     */
    #[\Override]
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
