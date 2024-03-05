<?php

declare(strict_types=1);

namespace Wallet\Budget\Domain\Models;

use Akaunting\Money\Money;
use Illuminate\Database\Eloquent\Model;

/**
 * Wallet\Budget\Domain\Models\Budget
 *
 * @property int                             $id
 * @property int                             $user_id
 * @property string                          $name
 * @property Money                           $amount
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Budget newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Budget newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Budget query()
 * @method static \Illuminate\Database\Eloquent\Builder|Budget whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Budget whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Budget whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Budget whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Budget whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Budget whereUserId($value)
 *
 * @mixin \Eloquent
 */
class Budget extends Model
{
    /**
     * @var string
     */
    protected $table = 'budgets';

    protected $fillable = BudgetFields::FILLABLE;

    /**
     * @var string[]
     *
     * @psalm-var array<string, string>
     */
    protected $casts = [
        'amount' => Money::class,
    ];
}
