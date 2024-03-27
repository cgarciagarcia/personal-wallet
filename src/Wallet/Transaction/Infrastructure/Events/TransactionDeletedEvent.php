<?php

declare(strict_types=1);


namespace Wallet\Transaction\Infrastructure\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Wallet\Transaction\Domain\Models\Transaction;

/**
 * @api
 */
final class TransactionDeletedEvent implements ShouldDispatchAfterCommit
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    public function __construct(public Transaction $transaction)
    {
    }
}
