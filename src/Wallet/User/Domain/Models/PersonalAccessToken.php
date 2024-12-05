<?php

declare(strict_types=1);

namespace Wallet\User\Domain\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

/**
 * Wallet\User\Domain\Models\PersonalAccessToken
 *
 * @property int         $id
 * @property string      $tokenable_type
 * @property int         $tokenable_id
 * @property string      $name
 * @property string      $token
 * @property array|null  $abilities
 * @property Carbon|null $last_used_at
 * @property Carbon|null $expires_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read Model|\Eloquent $tokenable
 *
 * @method static Builder|PersonalAccessToken actives()
 * @method static Builder|PersonalAccessToken newModelQuery()
 * @method static Builder|PersonalAccessToken newQuery()
 * @method static Builder|PersonalAccessToken onlyTrashed()
 * @method static Builder|PersonalAccessToken query()
 * @method static Builder|PersonalAccessToken whereAbilities($value)
 * @method static Builder|PersonalAccessToken whereCreatedAt($value)
 * @method static Builder|PersonalAccessToken whereDeletedAt($value)
 * @method static Builder|PersonalAccessToken whereExpiresAt($value)
 * @method static Builder|PersonalAccessToken whereId($value)
 * @method static Builder|PersonalAccessToken whereLastUsedAt($value)
 * @method static Builder|PersonalAccessToken whereName($value)
 * @method static Builder|PersonalAccessToken whereToken($value)
 * @method static Builder|PersonalAccessToken whereTokenableId($value)
 * @method static Builder|PersonalAccessToken whereTokenableType($value)
 * @method static Builder|PersonalAccessToken whereUpdatedAt($value)
 * @method static Builder|PersonalAccessToken withTrashed()
 * @method static Builder|PersonalAccessToken withoutTrashed()
 *
 * @mixin \Eloquent
 */
class PersonalAccessToken extends SanctumPersonalAccessToken
{
    use SoftDeletes;

    public const string SESSION_TOKEN_NAME = 'session_token';

    public const string REFRESH_TOKEN_NAME = 'refresh_token';

    /**
     * @var string[]
     *
     * @psalm-var list{'name', 'token', 'abilities', 'expires_at'}
     */
    protected $fillable = [
        'name',
        'token',
        'abilities',
        'expires_at',
    ];

    public function revoke(): void
    {
        $this->delete();
    }

    /**
     * @param Builder<PersonalAccessToken> $query
     *
     * @api
     *
     * @return Builder<PersonalAccessToken>
     */
    public function scopeActives(Builder $query): Builder
    {
        return $query->where('expires_at', '<=', now()->format('Y-m-d'));
    }
}
