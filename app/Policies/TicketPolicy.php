<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;
//Implements authorization checks
class TicketPolicy
{
    // A TicketPolicy restricts view, update, and delete to the ticket's owner
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