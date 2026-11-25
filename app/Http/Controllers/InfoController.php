<?php

namespace App\Http\Controllers;

use App\Models\InfoKontak;
use App\Models\PanduanBantuan;
use Inertia\Inertia;

class InfoController extends Controller
{
    public function bantuan()
    {
        $panduan = PanduanBantuan::orderBy('id_panduan')->get();
        return Inertia::render('Info/Bantuan', [
            'panduan' => $panduan,
        ]);
    }

    public function tentangKami()
    {
        $kontak = InfoKontak::orderBy('id_kontak')->get();
        return Inertia::render('Info/Tentang', [
            'kontak' => $kontak,
        ]);
    }
}
