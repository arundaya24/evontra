<?php
// database/migrations/xxxx_create_panduan_bantuan_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('panduan_bantuan', function (Blueprint $table) {
            $table->increments('id_panduan');
            $table->string('topik');
            $table->text('langkah_panduan');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('panduan_bantuan');
    }
};
