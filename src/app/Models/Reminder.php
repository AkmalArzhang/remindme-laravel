<?php

namespace App\Models;

use App\Models\Scopes\UserReminderScope;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reminder extends Model
{
    use HasFactory;

    /**
     * fillable
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'remind_at',
        'event_at',
        'user_id',
    ];

    /**
     * booted: Adding user_id global scope to check for user_id in each query
     *
     * @return void
     */
    protected static function booted()
    {
        static::addGlobalScope(new UserReminderScope);
    }

    /**
     * remindAt
     *
     * @return Attribute
     */
    protected function remindAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => strtotime($value),
            set: fn($value) => date('Y-m-d H:i:s', $value)
        );
    }

    /**
     * eventAt
     *
     * @return Attribute
     */
    protected function eventAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => strtotime($value),
            set: fn($value) => date('Y-m-d H:i:s', $value)
        );
    }

    /**
     * user
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}