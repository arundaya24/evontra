<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pemesanan', function (Blueprint $table) {
            $table->increments('id_pemesanan');
            $table->unsignedInteger('id_pengguna');
            $table->unsignedInteger('id_event');
            $table->integer('jumlah_tiket');
            $table->decimal('total_harga', 12, 2);
            $table->dateTime('tanggal_pemesanan');
            $table->string('status')->default('menunggu');
            $table->timestamps();

            $table->foreign('id_pengguna')
                  ->references('id_pengguna')
                  ->on('pengguna')
                  ->onDelete('cascade');

            $table->foreign('id_event')
                  ->references('id_event')
                  ->on('event')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pemesanan');
    }
};
