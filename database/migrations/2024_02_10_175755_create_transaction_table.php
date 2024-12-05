<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Wallet\Shared\Domain\Models\Category;
use Wallet\User\Domain\Models\User;

/**
 * @psalm-api
 */
return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->json("money");
            $table->string("type");
            $table->foreignIdFor(User::class)->constrained();
            $table->date("date");
            $table->foreignIdFor(Category::class)->nullable();
            $table->boolean("recurring");
            $table->smallInteger("repetition_count");
            $table->string("interval")->nullable();
            $table->smallInteger("repetition_remaining");
            $table->date('next_charge_date')->nullable();
            $table->string("description");
            $table->timestampsTz();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
