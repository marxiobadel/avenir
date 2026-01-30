<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Http\Requests\Front\EventRequest;
use App\Models\Event;
use Illuminate\Support\Facades\Log;

class EventController extends Controller
{
    public function store(EventRequest $request)
    {
        $validated = $request->validated();

        return back()->with('success', 'Événement créé avec succès !');
    }

    public function update(EventRequest $request, Event $event)
    {
        $validated = $request->validated();

        return back()->with('success', 'Événement mis à jour avec succès.');
    }

    public function destroy(Event $event)
    {
        try {
            $event->delete();

            return back()->with('success', 'Événement supprimé avec succès.');
        } catch (\Throwable $e) {
            Log::error('Event deletion failed', [
                'event_id' => $event->id,
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Une erreur est survenue lors de la suppression.');
        }
    }
}
