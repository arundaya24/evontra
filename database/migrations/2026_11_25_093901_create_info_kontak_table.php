<?php
// database/migrations/xxxx_create_info_kontak_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('info_kontak', function (Blueprint $table) {
            $table->increments('id_kontak');
            $table->string('jenis'); // telepon / email / media sosial
            $table->string('nilai');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('info_kontak');
    }
};
