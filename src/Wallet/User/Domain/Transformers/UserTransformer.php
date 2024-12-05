<?php

declare(strict_types=1);

namespace Wallet\User\Domain\Transformers;

use League\Fractal\TransformerAbstract;
use Wallet\User\Domain\Models\User;

final class UserTransformer extends TransformerAbstract
{
    /**
     * @return (int|string)[]
     *
     * @api
     *
     * @psalm-return array{id: int, name: string, email: string}
     */
    public function transform(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ];
    }
}
