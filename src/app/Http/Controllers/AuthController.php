<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Resources\UserResource;
use App\Traits\APIResponse;
use App\Traits\TokenManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    use APIResponse, TokenManager;

    /**
     * authenticate
     *
     * @param  \App\Http\Requests\AuthRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticate(AuthRequest $request): JsonResponse
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->error('ERR_INVALID_CREDS', 'Incorrect username or password', 401);
        }

        $user = Auth::user();

        // Testing
        $tokens = $this->createTokens($user, 864000);

        // $tokens = $this->createTokens($user);

        return $this->success([
            'user' => new UserResource($user),
            'access_token' => $tokens['access_token'],
            'refresh_token' => $tokens['refresh_token']
        ]);
    }

    /**
     * refreshToken
     *
     * @param  mixed $request
     * @return JsonResponse
     */
    public function refreshToken(Request $request): JsonResponse
    {
        $token = $request->bearerToken();

        $accessToken = $this->getRefreshToken($token);

        if (!$accessToken) {
            return $this->error('ERR_INVALID_REFRESH_TOKEN', 'Invalid refresh token', 401);
        }

        $user = $accessToken->tokenable;

        $this->revokeToken($accessToken);

        $tokens = $this->createTokens($user);

        return $this->success(
            [
                'access_token' => $tokens['access_token'],
                'refresh_token' => $tokens['refresh_token'],
            ]
        );
    }
}
