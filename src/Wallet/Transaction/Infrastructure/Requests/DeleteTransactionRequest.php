<?php

declare(strict_types=1);


namespace Wallet\Transaction\Infrastructure\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class DeleteTransactionRequest extends FormRequest
{
    /**
     * @api
     *
     * @return string[]
     *
     * @psalm-return array{transaction: 'exists:transactions,id'}
     */
    public function rules(): array
    {
        return [
            'transaction' => 'exists:transactions,id',
        ];
    }
}
