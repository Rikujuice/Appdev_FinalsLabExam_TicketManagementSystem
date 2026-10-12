<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;

class TicketPolicy
{
    // A TicketPolicy restricts view, update, and delete to the ticket's owner[cite: 3]
    public function view(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }

    public function update(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }

    public function delete(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }
}