<?php

declare(strict_types=1);

namespace Wallet\Budget\Infrastructure\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Wallet\Budget\Domain\Models\Budget;

/**
 * @api
 */
class CreatedBudgetEvent implements ShouldDispatchAfterCommit
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Budget $budget)
    {
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return PrivateChannel[]
     *
     * @psalm-return list{PrivateChannel}
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('budget'),
        ];
    }
}
