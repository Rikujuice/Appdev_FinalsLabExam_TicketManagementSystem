<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTicketRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorization is handled by the Policy
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:5', 'max:255'], // Required, 5 to 255 characters[cite: 2]
            'description' => ['required', 'string', 'min:10'], // Required, at least 10 characters[cite: 2]
            'priority' => ['required', 'string', Rule::in(['Low', 'Medium', 'High', 'Urgent'])], // Rule::in() for priority
            'category' => ['required', 'string', Rule::in(['Hardware', 'Software', 'Network', 'Account', 'Other'])], // Rule::in() for category
        ];
    }
}