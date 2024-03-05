<?php

declare(strict_types=1);

namespace Wallet\User\Domain\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

/**
 * Wallet\User\Domain\Models\PersonalAccessToken
 *
 * @property int                             $id
 * @property string                          $tokenable_type
 * @property int                             $tokenable_id
 * @property string                          $name
 * @property string                          $token
 * @property array|null                      $abilities
 * @property \Illuminate\Support\Carbon|null $last_used_at
 * @property \Illuminate\Support\Carbon|null $expires_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $tokenable
 *
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken query()
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereAbilities($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereLastUsedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereTokenableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereTokenableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|PersonalAccessToken withoutTrashed()
 *
 * @mixin \Eloquent
 */
class PersonalAccessToken extends SanctumPersonalAccessToken
{
    use SoftDeletes;

    public const SESSION_TOKEN_NAME = 'session_token';

    public const REFRESH_TOKEN_NAME = 'refresh_token';

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
}
