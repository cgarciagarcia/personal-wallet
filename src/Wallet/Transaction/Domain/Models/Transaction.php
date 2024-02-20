<?php

declare(strict_types=1);

namespace Wallet\Transaction\Domain\Models;

use Akaunting\Money\Money;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Wallet\Shared\Domain\Models\Category;
use Wallet\Transaction\Domain\Models\ValueObjects\FlowTypeEnum;
use Wallet\Transaction\Domain\Models\ValueObjects\RepetitionIntervalEnum;
use Wallet\User\Domain\Models\User;

/**
 * Wallet\Transaction\Domain\Models\Transaction
 *
 * @property int                         $id
 * @property Money                       $money
 * @property FlowTypeEnum                $type
 * @property int                         $user_id
 * @property Carbon                      $date
 * @property int|null                    $category_id
 * @property bool                        $recurring
 * @property int                         $repetition_count
 * @property RepetitionIntervalEnum|null $interval
 * @property int                         $repetition_remaining
 * @property string|null                 $next_charge_date
 * @property string                      $description
 * @property Carbon|null                 $created_at
 * @property Carbon|null                 $updated_at
 * @property-read Category|null $category
 * @property-read User $user
 *
 * @method static Builder|Transaction newModelQuery()
 * @method static Builder|Transaction newQuery()
 * @method static Builder|Transaction query()
 * @method static Builder|Transaction whereAmount($value)
 * @method static Builder|Transaction whereCategoryId($value)
 * @method static Builder|Transaction whereCreatedAt($value)
 * @method static Builder|Transaction whereDate($value)
 * @method static Builder|Transaction whereDescription($value)
 * @method static Builder|Transaction whereId($value)
 * @method static Builder|Transaction whereInterval($value)
 * @method static Builder|Transaction whereNextChargeDate($value)
 * @method static Builder|Transaction whereRecurring($value)
 * @method static Builder|Transaction whereRepetitionCount($value)
 * @method static Builder|Transaction whereRepetitionRemaining($value)
 * @method static Builder|Transaction whereType($value)
 * @method static Builder|Transaction whereUpdatedAt($value)
 * @method static Builder|Transaction whereUserId($value)
 *
 * @mixin \Eloquent
 */
class Transaction extends Model
{
    /**
     * @var string
     */
    protected $table = 'transactions';

    protected $fillable = TransactionFields::FILLABLE;

    protected $casts = [
        TransactionFields::DATE => 'date',
        TransactionFields::TYPE => FlowTypeEnum::class,
        TransactionFields::MONEY => Money::class,
        TransactionFields::INTERVAL => RepetitionIntervalEnum::class,
        TransactionFields::RECURRING => 'boolean',
    ];
}
