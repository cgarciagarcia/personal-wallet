<?php

declare(strict_types=1);

namespace Wallet\Transaction\Domain\Models;

use Akaunting\Money\Money;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
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
 *
 * @method static Builder|Transaction newModelQuery()
 * @method static Builder|Transaction newQuery()
 * @method static Builder|Transaction query()
 * @method static Builder|Transaction whereCategoryId($value)
 * @method static Builder|Transaction whereCreatedAt($value)
 * @method static Builder|Transaction whereDate($value)
 * @method static Builder|Transaction whereDescription($value)
 * @method static Builder|Transaction whereId($value)
 * @method static Builder|Transaction whereInterval($value)
 * @method static Builder|Transaction whereMoney($value)
 * @method static Builder|Transaction whereNextChargeDate($value)
 * @method static Builder|Transaction whereRecurring($value)
 * @method static Builder|Transaction whereRepetitionCount($value)
 * @method static Builder|Transaction whereRepetitionRemaining($value)
 * @method static Builder|Transaction whereType($value)
 * @method static Builder|Transaction whereUpdatedAt($value)
 * @method static Builder|Transaction whereUserId($value)
 *
 * @mixin Eloquent
 */
class Transaction extends Model
{
    use SoftDeletes;

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

    /**
     * @param Builder<Transaction> $query
     *
     * @api
     *
     * @psalm-return Builder<self>
     */
    public function scopeBetweenDates(Builder $query, string $from, string $to): Builder
    {
        return $query->whereBetween(TransactionFields::DATE, [$from, $to]);
    }

    /**
     * @api
     *
     * @param Builder<Transaction> $query
     *
     * @psalm-return Builder<self>
     */
    public function scopeMonth(Builder $query, int ...$months): Builder
    {
        return $query->whereIn(DB::raw('month(' . TransactionFields::DATE . ')'), $months);
    }

    /**
     * @api
     *
     * @param Builder<Transaction> $query
     *
     * @return Builder<self>
     */
    public function scopeDate(Builder $query, string ...$days): Builder
    {
        return $query->whereIn(TransactionFields::DATE, $days);
    }

    /**
     * @api
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
