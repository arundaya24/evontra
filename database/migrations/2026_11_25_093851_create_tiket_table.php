<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tiket', function (Blueprint $table) {
            $table->increments('id_tiket');
            $table->unsignedInteger('id_pemesanan');
            $table->string('kode_qr')->unique();
            $table->string('status')->default('aktif'); // aktif / terpakai
            $table->timestamps();

            $table->foreign('id_pemesanan')
                  ->references('id_pemesanan')
                  ->on('pemesanan')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tiket');
    }
};
