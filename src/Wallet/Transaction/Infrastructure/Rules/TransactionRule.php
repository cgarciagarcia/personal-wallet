<?php

declare(strict_types=1);


namespace Wallet\Transaction\Infrastructure\Rules;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Wallet\Transaction\Domain\Models\TransactionFields;
use Wallet\Transaction\Domain\Models\ValueObjects\RepetitionIntervalEnum;

final class TransactionRule
{
    /**
     * @return (\Illuminate\Validation\Rules\Enum|\Illuminate\Validation\Rules\ExcludeIf|string)[][]
     *
     * @psalm-return array{recurring: list{'boolean', 'required'}, repetition_count: list{\Illuminate\Validation\Rules\ExcludeIf, 'required', 'integer', 'gte:1'}, interval: list{\Illuminate\Validation\Rules\ExcludeIf, 'required', \Illuminate\Validation\Rules\Enum}}
     */
    public static function rules(FormRequest $request): array
    {
        $recurring = $request->get(TransactionFields::RECURRING);
        $repetition = $request->get(TransactionFields::REPETITION_COUNT);

        return [
            TransactionFields::RECURRING => ['boolean', 'required'],
            TransactionFields::REPETITION_COUNT => [
                Rule::excludeIf($recurring === false || $repetition !== null),
                'required', 'integer', 'gte:1',
            ],
            TransactionFields::INTERVAL => [
                Rule::excludeIf($recurring === false && ($repetition === null || $repetition === 0)),
                'required', Rule::enum(RepetitionIntervalEnum::class),
            ],
        ];
    }
}
