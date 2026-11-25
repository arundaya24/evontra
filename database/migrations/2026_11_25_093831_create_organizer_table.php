<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('organizer', function (Blueprint $table) {
            $table->increments('id_organizer');
            $table->unsignedInteger('id_pengguna');
            $table->string('nama_organizer');
            $table->string('no_telepon');
            $table->string('alamat');
            $table->timestamps();

            $table->foreign('id_pengguna')
                  ->references('id_pengguna')
                  ->on('pengguna')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('organizer');
    }
};
