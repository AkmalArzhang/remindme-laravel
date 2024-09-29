<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReminderRequest;
use App\Http\Resources\ReminderResource;
use App\Models\Reminder;
use App\Traits\APIResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ReminderController extends Controller
{
    use APIResponse;

    /**
     * List reminders
     *
     * @param  mixed $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $limit = $request->query('limit', 10);

        $reminders = Reminder::orderBy('remind_at', 'asc')
            ->limit($limit)
            ->get();

        return $this->success([
            'reminders' => ReminderResource::collection($reminders),
            'limit' => $limit,
        ]);

    }

    /**
     * Store a reminder
     *
     * @param  mixed $request
     * @return JsonResponse
     */
    public function store(ReminderRequest $request): JsonResponse
    {
        $data = array_merge($request->validated(), ['user_id' => auth()->id()]);

        $reminder = Reminder::create($data);

        return $this->success(new ReminderResource($reminder));
    }

    /**
     * Show a reminder
     *
     * @param  Reminder $reminder
     * @return JsonResponse
     */
    public function show(Reminder $reminder): JsonResponse
    {
        return $this->success(new ReminderResource($reminder));
    }

    /**
     * Update a reminder
     *
     * @param  mixed $request
     * @param  Reminder $reminder
     * @return JsonResponse
     */
    public function update(ReminderRequest $request, Reminder $reminder): JsonResponse
    {
        $reminder->update($request->validated());

        return $this->success(new ReminderResource($reminder));
    }

    /**
     * Remove a reminder
     *
     * @param  Reminder $reminder
     * @return JsonResponse
     */
    public function destroy(Reminder $reminder): JsonResponse
    {
        $reminder->delete();

        return $this->success();
    }
}