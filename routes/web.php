<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\OrganizerController;
use App\Http\Controllers\PemesananController;
use Illuminate\Support\Facades\Route;

Route::get('/', [EventController::class, 'beranda']);
Route::get('/beranda', [EventController::class, 'beranda'])->name('beranda');
Route::get('/jelajahi', [EventController::class, 'jelajahi'])->name('event.jelajahi');
Route::get('/bantuan', [InfoController::class, 'bantuan'])->name('bantuan');
Route::get('/tentang-kami', [InfoController::class, 'tentangKami'])->name('tentang');

// Autentikasi
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// Fitur terautentikasi
Route::middleware('auth')->group(function () {
    Route::get('/organizer/daftar', [OrganizerController::class, 'create'])->name('organizer.create');
    Route::post('/organizer/daftar', [OrganizerController::class, 'store'])->name('organizer.store');

    Route::get('/event/buat', [EventController::class, 'create'])->name('event.create');
    Route::post('/event/buat', [EventController::class, 'store'])->name('event.store');

    Route::get('/event/{event}/pesan', [PemesananController::class, 'create'])->name('pemesanan.create');
    Route::post('/event/{event}/pesan', [PemesananController::class, 'store'])->name('pemesanan.store');
    Route::post('/pemesanan/{pemesanan}/bayar', [PemesananController::class, 'bayar'])->name('pemesanan.bayar');

    Route::get('/tiket-saya', [PemesananController::class, 'tiketSaya'])->name('tiket.saya');
});
