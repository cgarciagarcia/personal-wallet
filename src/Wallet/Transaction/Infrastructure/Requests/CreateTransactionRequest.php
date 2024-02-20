<?php

declare(strict_types=1);

namespace Wallet\Transaction\Infrastructure\Requests;

use Exception;
use Illuminate\Foundation\Http\FormRequest;
use Wallet\Transaction\Domain\Dtos\CreateTransactionDto;
use Wallet\Transaction\Domain\Models\TransactionFields;
use Wallet\Transaction\Domain\Models\ValueObjects\FlowTypeEnum;
use Wallet\Transaction\Domain\Models\ValueObjects\RepetitionIntervalEnum;

final class CreateTransactionRequest extends FormRequest
{
    /**
     * @throws Exception
     */
    public function toDto(): CreateTransactionDto
    {
        /** @var int|null $category */
        $category = $this->get(TransactionFields::CATEGORY_ID);

        return new CreateTransactionDto(
            amount: money($this->get(TransactionFields::MONEY)),
            type: FlowTypeEnum::from($this->string(TransactionFields::TYPE)->toString()),
            date: $this->date(TransactionFields::DATE) ?? throw new Exception('No date provided.'),
            category: $category,
            recurring: $this->boolean(TransactionFields::RECURRING),
            description: $this->string(TransactionFields::DESCRIPTION)->toString(),
            interval: RepetitionIntervalEnum::tryFrom($this->string(TransactionFields::INTERVAL)->toString())
        );
    }
}
