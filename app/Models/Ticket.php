<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    use HasFactory;

    // Use mass-assignment protection ($fillable)
    // Notice 'user_id' is excluded here because it will be set from auth()->id()[cite: 3]
    protected $fillable = [
        'title',
        'description',
        'priority',
        'status',
        'category',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}