<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organizer extends Model
{
    protected $table = 'organizer';
    protected $primaryKey = 'id_organizer';

    protected $fillable = [
        'id_pengguna',
        'nama_organizer',
        'no_telepon',
        'alamat',
    ];

    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class, 'id_pengguna', 'id_pengguna');
    }

    public function events()
    {
        return $this->hasMany(Event::class, 'id_organizer', 'id_organizer');
    }
}
