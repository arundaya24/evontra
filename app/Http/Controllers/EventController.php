<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventController extends Controller
{
    // Alur Beranda: event rekomendasi yang dipublikasikan
    public function beranda()
    {
        $rekomendasi = Event::with('organizer')
            ->where('status', 'dipublikasikan')
            ->where('is_rekomendasi', true)
            ->orderBy('tanggal_event')
            ->get();

        return Inertia::render('Beranda', [
            'rekomendasi' => $rekomendasi,
        ]);
    }

    // Alur Jelajahi Event: pencarian & filter kategori
    public function jelajahi(Request $request)
    {
        $query = Event::with('organizer')->where('status', 'dipublikasikan');

        if ($request->filled('q')) {
            $query->where('nama_event', 'like', '%' . $request->q . '%');
        }

        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        $events = $query->orderBy('tanggal_event')->paginate(9)->withQueryString();
        $kategoriList = Event::where('status', 'dipublikasikan')
            ->distinct()
            ->pluck('kategori');

        return Inertia::render('Event/Jelajahi', [
            'events'       => $events,
            'kategoriList' => $kategoriList,
            'filters'      => [
                'q'        => $request->input('q', ''),
                'kategori' => $request->input('kategori', ''),
            ],
        ]);
    }

    // Alur Buat Event
    public function create()
    {
        $organizer = Auth::user()->organizer;
        if (!$organizer) {
            return redirect()->route('organizer.create')
                ->with('info', 'Silakan lengkapi profil organizer terlebih dahulu.');
        }

        return Inertia::render('Event/Create');
    }

    public function store(Request $request)
    {
        $organizer = Auth::user()->organizer;
        abort_unless($organizer, 403);

        $data = $request->validate([
            'nama_event'     => ['required', 'string', 'max:255'],
            'deskripsi'      => ['required', 'string'],
            'kategori'       => ['required', 'string', 'max:100'],
            'lokasi'         => ['required', 'string', 'max:255'],
            'tanggal_event'  => ['required', 'date'],
            'harga_tiket'    => ['required', 'numeric', 'min:0'],
            'kuota_tiket'    => ['required', 'integer', 'min:1'],
            'poster'         => ['nullable', 'image', 'max:2048'],
            'is_rekomendasi' => ['nullable', 'boolean'],
            'status'         => ['required', 'in:draft,dipublikasikan'],
        ]);

        $posterPath = null;
        if ($request->hasFile('poster')) {
            $posterPath = $request->file('poster')->store('posters', 'public');
        }

        Event::create([
            'id_organizer'   => $organizer->id_organizer,
            'nama_event'     => $data['nama_event'],
            'deskripsi'      => $data['deskripsi'],
            'kategori'       => $data['kategori'],
            'lokasi'         => $data['lokasi'],
            'tanggal_event'  => $data['tanggal_event'],
            'harga_tiket'    => $data['harga_tiket'],
            'kuota_tiket'    => $data['kuota_tiket'],
            'poster'         => $posterPath,
            'is_rekomendasi' => $request->boolean('is_rekomendasi'),
            'status'         => $data['status'],
        ]);

        return redirect()->route('event.jelajahi')->with('success', 'Event berhasil disimpan.');
    }
}
