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
    /**
     * @api
     *
     * @return (\Illuminate\Validation\Rules\Enum|\Illuminate\Validation\Rules\ExcludeIf|string)[][]
     *
     * @psalm-return array{money: list{'required', 'numeric'}, type: list{'required', \Illuminate\Validation\Rules\Enum}, date: list{'required', 'date'}, category_id: list{'nullable', 'integer'}, description: list{'required', 'string'}, recurring: list{'boolean', 'required'}, repetition_count: list{\Illuminate\Validation\Rules\ExcludeIf, 'required', 'integer', 'gte:1'}, interval: list{\Illuminate\Validation\Rules\ExcludeIf, 'required', \Illuminate\Validation\Rules\Enum}}
     */
    public function rules(): array
    {
        return array_merge([
            TransactionFields::MONEY => ['required', 'numeric'],
            TransactionFields::TYPE => ['required', Rule::enum(FlowTypeEnum::class)],
            TransactionFields::DATE => ['required', 'date'],
            TransactionFields::CATEGORY_ID => ['nullable', 'integer'],
            TransactionFields::DESCRIPTION => ['required', 'string'],
        ], TransactionRule::rules($this));
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
