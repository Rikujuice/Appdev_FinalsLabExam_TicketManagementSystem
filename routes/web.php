<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketController; // Add this import at the top
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ... (existing Breeze routes for '/' and '/dashboard')

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Use Route::resource('tickets', TicketController::class)[cite: 2]
    Route::resource('tickets', TicketController::class);
});

require __DIR__.'/auth.php';