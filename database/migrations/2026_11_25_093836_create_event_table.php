<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('event', function (Blueprint $table) {
            $table->increments('id_event');
            $table->unsignedInteger('id_organizer');
            $table->string('nama_event');
            $table->text('deskripsi');
            $table->string('kategori');
            $table->string('lokasi');
            $table->date('tanggal_event');
            $table->decimal('harga_tiket', 12, 2);
            $table->integer('kuota_tiket');
            $table->string('poster')->nullable();
            $table->boolean('is_rekomendasi')->default(false);
            $table->string('status')->default('draft');
            $table->timestamps();

            $table->foreign('id_organizer')
                  ->references('id_organizer')
                  ->on('organizer')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event');
    }
};
