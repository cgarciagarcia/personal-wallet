<?php

declare(strict_types=1);

namespace Wallet\Budget\Infrastructure\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Wallet\Budget\Domain\Dtos\CreateBudgetDto;
use Wallet\Budget\Domain\Models\BudgetFields;

final class CreateBudgetRequest extends FormRequest
{
    public function toDto(): CreateBudgetDto
    {
        return new CreateBudgetDto(
            $this->str(BudgetFields::NAME)->toString(),
            $this->str(BudgetFields::AMOUNT)->toString(),
        );
    }
}
