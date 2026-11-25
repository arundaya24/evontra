<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'event';
    protected $primaryKey = 'id_event';

    protected $fillable = [
        'id_organizer',
        'nama_event',
        'deskripsi',
        'kategori',
        'lokasi',
        'tanggal_event',
        'harga_tiket',
        'kuota_tiket',
        'poster',
        'is_rekomendasi',
        'status',
    ];

    protected $casts = [
        'tanggal_event'  => 'date',
        'harga_tiket'    => 'decimal:2',
        'is_rekomendasi' => 'boolean',
    ];

    public function organizer()
    {
        return $this->belongsTo(Organizer::class, 'id_organizer', 'id_organizer');
    }

    public function pemesanan()
    {
        return $this->hasMany(Pemesanan::class, 'id_event', 'id_event');
    }
}
