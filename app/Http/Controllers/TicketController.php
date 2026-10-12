<?php

namespace App\Http\Controllers;
//CONTROLLER LOGIC
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
//Handles HTTP requests, processes business logic, and talks to the database.
class TicketController extends Controller
{
    public function index(): Response//Fetches tickets belonging strictly to the currently authenticated user
    {
        // Read: an index page listing the user's tickets with pagination (10 per page)
        $tickets = Ticket::where('user_id', auth()->id()) //and passes them to the frontend using Inertia.
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

    public function store(StoreTicketRequest $request): RedirectResponse //Validates incoming form data using Form Requests, attaches the user ID, and saves or modifies the record in MySQL.
    {
        // Set user_id from auth()->id(), never from the form
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

    public function destroy(Ticket $ticket): RedirectResponse //Deletes a ticket after verifying authorization.
    {
        Gate::authorize('delete', $ticket);

        $ticket->delete();

        return redirect()->route('tickets.index')->with('message', 'Ticket deleted successfully.');
    }
}