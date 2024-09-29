<?php

namespace App\Traits;
use Illuminate\Http\JsonResponse;

trait APIResponse
{
    protected function success($data, $code = 200): JsonResponse
    {
        return response()->json([
            'ok' => true,
            'data' => $data
        ], $code);
    }

    protected function error($err = null, $message = null, $code = 400): JsonResponse
    {
        return response()->json([
            'ok' => false,
            'err' => $err,
            'message' => $message,
        ], $code);
    }
}