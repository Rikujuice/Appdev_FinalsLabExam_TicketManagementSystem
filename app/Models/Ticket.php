<?php

namespace App\Models;
//DATABASE AND MODELS OR THE STORAGE
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
//represents tickets database table in OOP in php
class Ticket extends Model
{
    use HasFactory;

    // Use mass-assignment protection ($fillable)
    // Notice 'user_id' is excluded here because it will be set from auth()->id()
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