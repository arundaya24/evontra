<?php

namespace App\Http\Controllers;

use App\Models\InfoKontak;
use App\Models\PanduanBantuan;

class InfoController extends Controller
{
    public function bantuan()
    {
        $panduan = PanduanBantuan::orderBy('id_panduan')->get();
        return view('info.bantuan', compact('panduan'));
    }

    public function tentangKami()
    {
        $kontak = InfoKontak::orderBy('id_kontak')->get();
        return view('info.tentang', compact('kontak'));
    }
}
