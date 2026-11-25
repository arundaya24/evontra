<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pemesanan extends Model
{
    protected $table = 'pemesanan';
    protected $primaryKey = 'id_pemesanan';

    protected $fillable = [
        'id_pengguna',
        'id_event',
        'jumlah_tiket',
        'total_harga',
        'tanggal_pemesanan',
        'status',
    ];

    protected $casts = [
        'total_harga'       => 'decimal:2',
        'tanggal_pemesanan' => 'datetime',
    ];

    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class, 'id_pengguna', 'id_pengguna');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'id_event', 'id_event');
    }

    public function tiket()
    {
        return $this->hasMany(Tiket::class, 'id_pemesanan', 'id_pemesanan');
    }
}
