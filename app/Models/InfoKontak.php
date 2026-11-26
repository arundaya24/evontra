<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InfoKontak extends Model
{
    protected $table = 'info_kontak';
    protected $primaryKey = 'id_kontak';

    protected $fillable = [
        'jenis',
        'nilai',
    ];
}
