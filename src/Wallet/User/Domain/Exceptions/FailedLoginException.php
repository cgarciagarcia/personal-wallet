<?php

declare(strict_types=1);

namespace Wallet\User\Domain\Exceptions;

use Exception;
use Throwable;

class FailedLoginException extends Exception
{
    public function __construct(string $message = "", int $code = 401, ?Throwable $previous = null)
    {
        $message = $message === '' ? __('auth.failed') : $message;
        parent::__construct($message, $code, $previous);
    }
}
