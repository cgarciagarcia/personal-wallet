<?php

declare(strict_types=1);

namespace Wallet\User\Domain\Transformers;

use League\Fractal\TransformerAbstract;
use Wallet\User\Domain\Models\User;

final class UserTransformer extends TransformerAbstract
{

    public function transform(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ];
    }
}
