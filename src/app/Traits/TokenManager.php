<?php

namespace App\Traits;

use App\Models\User;
use Laravel\Sanctum\PersonalAccessToken;

trait TokenManager
{
    /**
     * Generate access and refresh tokens for the user.
     *
     * @param  \App\Models\User  $user
     * @param  int $accessTokenTTL In Seconds
     * @param  int $refreshTokenTTL In Seconds
     * @return array
     */
    public function createTokens(User $user, int $accessTokenTTL = 20, int $refreshTokenTTL = 24 * 60 * 60): array
    {
        $accessToken = $user->createToken('access_token', ['*'], now()->addSeconds($accessTokenTTL))->plainTextToken;
        $refreshToken = $user->createToken('refresh_token', ['refresh-token'], now()->addSeconds($refreshTokenTTL))->plainTextToken;

        return [
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
        ];
    }

    /**
     * Validate and retrieve a valid token for refresh.
     *
     * @param  string  $token
     * @return \Laravel\Sanctum\PersonalAccessToken|null
     */
    public function getRefreshToken(string $token): ?PersonalAccessToken
    {
        $accessToken = PersonalAccessToken::findToken($token);

        if ($accessToken && $accessToken->can('refresh-token')) {
            return $accessToken;
        }

        return null;
    }

    /**
     * Revoke a given token.
     *
     * @param  \Laravel\Sanctum\PersonalAccessToken  $token
     * @return void
     */
    public function revokeToken(PersonalAccessToken $token): void
    {
        $token->delete();
    }
}