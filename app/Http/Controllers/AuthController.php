<?php

namespace App\Http\Controllers;

use App\Models\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showLogin()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/beranda');
        }

        return back()->withErrors([
            'email' => 'Email atau password tidak sesuai.',
        ])->onlyInput('email');
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'nama'       => ['required', 'string', 'max:255'],
            'email'      => ['required', 'email', 'unique:pengguna,email'],
            'password'   => ['required', 'min:6', 'confirmed'],
            'no_telepon' => ['required', 'string', 'max:20'],
        ]);

        $pengguna = Pengguna::create([
            'nama'       => $data['nama'],
            'email'      => $data['email'],
            'password'   => Hash::make($data['password']),
            'no_telepon' => $data['no_telepon'],
        ]);

        Auth::login($pengguna);
        return redirect('/beranda');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}
