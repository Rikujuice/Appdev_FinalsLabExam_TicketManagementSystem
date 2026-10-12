<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTicketRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:5', 'max:255'],
            'description' => ['required', 'string', 'min:10'],
            'priority' => ['required', 'string', Rule::in(['Low', 'Medium', 'High', 'Urgent'])],
            'category' => ['required', 'string', Rule::in(['Hardware', 'Software', 'Network', 'Account', 'Other'])],
            'status' => ['required', 'string', Rule::in(['Open', 'In Progress', 'Resolved', 'Closed'])], // Rule::in() for status[cite: 3]
        ];
    }
}