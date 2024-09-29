<?php

namespace App\Exceptions;

use App\Traits\APIResponse;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    use APIResponse;
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        if ($exception instanceof \Illuminate\Validation\ValidationException) {

            return $this->error('ERR_BAD_REQUEST', $exception->validator->errors()->first(), 400);
        }

        if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
            return $this->error('ERR_INVALID_ACCESS_TOKEN', "invalid access token", 401);
        }

        if ($exception instanceof \Illuminate\Auth\Access\AuthorizationException) {
            return $this->error('ERR_FORBIDDEN_ACCESS', "user doesn't have enough authorization", 403);
        }

        if (
            $exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException ||
            $exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
        ) {
            return $this->error('ERR_NOT_FOUND', "resource is not found", 404);
        }

        return $this->error('ERR_INTERNAL_ERROR', "something went wrong", 500);

    }

}
