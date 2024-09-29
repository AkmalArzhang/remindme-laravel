<?php

namespace App\Traits;
use Illuminate\Http\JsonResponse;

trait APIResponse
{
    /**
     * success response
     *
     * @param  mixed $data
     * @param  mixed $code
     * @return JsonResponse
     */
    protected function success($data = null, $code = 200): JsonResponse
    {
        $response = ['ok' => true];

        if ($data) {
            $response['data'] = $data;
        }

        return response()->json($response, $code);
    }

    /**
     * error response
     *
     * @param  mixed $err
     * @param  mixed $message
     * @param  mixed $code
     * @return JsonResponse
     */
    protected function error($err = null, $message = null, $code = 400): JsonResponse
    {
        return response()->json([
            'ok' => false,
            'err' => $err,
            'message' => $message,
        ], $code);
    }
}