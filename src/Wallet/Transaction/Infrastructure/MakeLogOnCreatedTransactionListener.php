<?php

declare(strict_types=1);

namespace Wallet\Transaction\Infrastructure;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Wallet\Transaction\Infrastructure\Events\CreatedTransactionEvent;

class MakeLogOnCreatedTransactionListener implements ShouldQueue
{
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    /**
     *
     *
     * @psalm-api
     */
    public function __invoke(CreatedTransactionEvent $event): void
    {
        echo "Transaction {$event->transaction->id} was created\n";
    }
}
