<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PanduanBantuan extends Model
{
    protected $table = 'panduan_bantuan';
    protected $primaryKey = 'id_panduan';

    protected $fillable = [
        'topik',
        'langkah_panduan',
    ];
}
