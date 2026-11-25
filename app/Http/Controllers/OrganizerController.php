<?php

namespace App\Http\Controllers;

use App\Models\Organizer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrganizerController extends Controller
{
    public function create()
    {
        return view('organizer.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_organizer' => ['required', 'string', 'max:255'],
            'no_telepon'     => ['required', 'string', 'max:20'],
            'alamat'         => ['required', 'string', 'max:255'],
        ]);

        Organizer::updateOrCreate(
            ['id_pengguna' => Auth::id()],
            [
                'nama_organizer' => $data['nama_organizer'],
                'no_telepon'     => $data['no_telepon'],
                'alamat'         => $data['alamat'],
            ]
        );

        return redirect()->route('event.create')->with('success', 'Profil organizer tersimpan.');
    }
}
