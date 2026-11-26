<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Pemesanan;
use App\Models\Tiket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PemesananController extends Controller
{
    public function create(Event $event)
    {
        $event->load('organizer');
        return Inertia::render('Pemesanan/Create', [
            'event' => $event,
        ]);
    }

    public function store(Request $request, Event $event)
    {
        $data = $request->validate([
            'jumlah_tiket' => ['required', 'integer', 'min:1', 'max:' . $event->kuota_tiket],
        ]);

        $pemesanan = DB::transaction(function () use ($data, $event) {
            $totalHarga = $event->harga_tiket * $data['jumlah_tiket'];

            $order = Pemesanan::create([
                'id_pengguna'       => Auth::id(),
                'id_event'          => $event->id_event,
                'jumlah_tiket'      => $data['jumlah_tiket'],
                'total_harga'       => $totalHarga,
                'tanggal_pemesanan' => now(),
                'status'            => 'menunggu',
            ]);

            $event->decrement('kuota_tiket', $data['jumlah_tiket']);

            return $order;
        });

        return redirect()->route('tiket.saya')->with('success', 'Pemesanan dibuat. Silakan selesaikan pembayaran.');
    }

    public function bayar(Pemesanan $pemesanan)
    {
        abort_unless($pemesanan->id_pengguna === Auth::id(), 403);

        DB::transaction(function () use ($pemesanan) {
            if ($pemesanan->status !== 'lunas') {
                $pemesanan->update(['status' => 'lunas']);

                for ($i = 0; $i < $pemesanan->jumlah_tiket; $i++) {
                    Tiket::create([
                        'id_pemesanan' => $pemesanan->id_pemesanan,
                        'kode_qr'      => 'TIX-' . strtoupper(Str::random(10)) . '-' . $pemesanan->id_pemesanan . ($i + 1),
                        'status'       => 'aktif',
                    ]);
                }
            }
        });

        return redirect()->route('tiket.saya')->with('success', 'Pembayaran lunas! E-Ticket telah terbit.');
    }

    public function tiketSaya()
    {
        $pemesananList = Pemesanan::with(['event', 'tiket'])
            ->where('id_pengguna', Auth::id())
            ->latest('tanggal_pemesanan')
            ->get();

        return Inertia::render('Tiket/Saya', [
            'pemesananList' => $pemesananList,
        ]);
    }
}
