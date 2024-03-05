<?php

declare(strict_types=1);

namespace Wallet\User\Domain\Models;

enum AccessTokenAbilityEnum: string
{
    case IssueAccessToken = 'issue-access-token';
    case AccessApi = 'access-api';
}
