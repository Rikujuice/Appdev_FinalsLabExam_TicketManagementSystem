<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id(); // bigint, primary key, auto-increment[cite: 2]
            $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // owner of the ticket; cascade on delete[cite: 2]
            $table->string('title', 255); // string(255)[cite: 2]
            $table->text('description'); // text[cite: 2]
            $table->enum('priority', ['Low', 'Medium', 'High', 'Urgent']); // enum or string[cite: 2]
            $table->enum('status', ['Open', 'In Progress', 'Resolved', 'Closed'])->default('Open'); // enum or string, defaults to Open[cite: 2]
            $table->enum('category', ['Hardware', 'Software', 'Network', 'Account', 'Other']); // enum or string[cite: 2]
            $table->timestamps(); // created_at / updated_at[cite: 2]
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};