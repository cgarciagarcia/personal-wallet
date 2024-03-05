<?php

declare(strict_types=1);

namespace Wallet\Budget\Infrastructure\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Wallet\Budget\Domain\Dtos\CreateBudgetDto;
use Wallet\Budget\Domain\Models\BudgetFields;

final class CreateBudgetRequest extends FormRequest
{
    /**
     * @api
     *
     * @return string[][]
     *
     * @psalm-return array{name: list{'required', 'string', 'max:255'}, amount: list{'required', 'string'}}
     */
    public function rules(): array
    {
        return [
            BudgetFields::NAME => ['required', 'string', 'max:255'],
            BudgetFields::AMOUNT => ['required', 'string'],
        ];
    }

    public function toDto(): CreateBudgetDto
    {
        return new CreateBudgetDto(
            $this->str(BudgetFields::NAME)->toString(),
            $this->str(BudgetFields::AMOUNT)->toString(),
        );
    }
}
