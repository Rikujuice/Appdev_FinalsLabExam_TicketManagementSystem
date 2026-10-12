<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    public function index(): Response
    {
        // Read: an index page listing the user's tickets with pagination (10 per page)[cite: 2]
        $tickets = Ticket::where('user_id', auth()->id())
            ->latest()
            ->paginate(10);

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Tickets/Create');
    }

    public function store(StoreTicketRequest $request): RedirectResponse
    {
        // Set user_id from auth()->id(), never from the form[cite: 3]
        $ticket = new Ticket($request->validated());
        $ticket->user_id = auth()->id();
        $ticket->save();

        return redirect()->route('tickets.index')->with('message', 'Ticket created successfully.');
    }

    public function show(Ticket $ticket): Response
    {
        Gate::authorize('view', $ticket); // Must return 403 if opening another user's ticket[cite: 3]

        return Inertia::render('Tickets/Show', [
            'ticket' => $ticket
        ]);
    }

    public function edit(Ticket $ticket): Response
    {
        Gate::authorize('update', $ticket);

        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket
        ]);
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket): RedirectResponse
    {
        Gate::authorize('update', $ticket);

        $ticket->update($request->validated());

        return redirect()->route('tickets.index')->with('message', 'Ticket updated successfully.');
    }

    public function destroy(Ticket $ticket): RedirectResponse
    {
        Gate::authorize('delete', $ticket);

        $ticket->delete();

        return redirect()->route('tickets.index')->with('message', 'Ticket deleted successfully.');
    }
}