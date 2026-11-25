<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Pengguna extends Authenticatable
{
    use Notifiable;

    protected $table = 'pengguna';
    protected $primaryKey = 'id_pengguna';

    protected $fillable = [
        'nama',
        'email',
        'password',
        'no_telepon',
    ];

    protected $hidden = [
        'password',
    ];

    public function organizer()
    {
        return $this->hasOne(Organizer::class, 'id_pengguna', 'id_pengguna');
    }

    public function pemesanan()
    {
        return $this->hasMany(Pemesanan::class, 'id_pengguna', 'id_pengguna');
    }
}
