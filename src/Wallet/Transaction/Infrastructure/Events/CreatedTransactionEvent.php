<?php

declare(strict_types=1);

namespace Wallet\Transaction\Infrastructure\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Wallet\Transaction\Domain\Models\Transaction;

final class CreatedTransactionEvent implements ShouldDispatchAfterCommit
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    /**
     * @api
     */
    public function __construct(public Transaction $transaction)
    {
    }
}
