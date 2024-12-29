<?php

declare(strict_types=1);

namespace Wallet\Transaction\Infrastructure\Requests;

use Exception;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Wallet\Transaction\Domain\Dtos\CreateTransactionDto;
use Wallet\Transaction\Domain\Models\TransactionFields;
use Wallet\Transaction\Domain\Models\ValueObjects\FlowTypeEnum;
use Wallet\Transaction\Domain\Models\ValueObjects\RepetitionIntervalEnum;
use Wallet\Transaction\Infrastructure\Rules\TransactionRule;
use Wallet\User\Domain\Models\User;

final class CreateTransactionRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            ...TransactionRule::rules($this),
            TransactionFields::MONEY => ['required', 'numeric'],
            TransactionFields::TYPE => ['required', Rule::enum(FlowTypeEnum::class)],
            TransactionFields::DATE => ['required', 'date'],
            TransactionFields::CATEGORY_ID => ['nullable', 'integer', ],
            TransactionFields::DESCRIPTION => ['required', 'string', ],
        ];
    }

    /**
     * @throws Exception
     */
    public function toDto(): CreateTransactionDto
    {
        /** @var int|null $category */
        $category = $this->get(TransactionFields::CATEGORY_ID);

        /** @var User $user */
        $user = $this->user();

        return new CreateTransactionDto(
            amount: money($this->get(TransactionFields::MONEY)),
            type: FlowTypeEnum::from($this->string(TransactionFields::TYPE)->toString()),
            date: $this->date(TransactionFields::DATE) ?? throw new Exception('No date provided.'),
            category: $category,
            recurring: $this->boolean(TransactionFields::RECURRING),
            description: $this->string(TransactionFields::DESCRIPTION)->toString(),
            interval: RepetitionIntervalEnum::tryFrom($this->string(TransactionFields::INTERVAL)->toString()),
            user: $user
        );
    }
}
