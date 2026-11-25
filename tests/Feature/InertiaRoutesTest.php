<?php

namespace Tests\Feature;

use App\Models\Organizer;
use App\Models\Pengguna;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class InertiaRoutesTest extends TestCase
{
    public function test_beranda_page_renders_with_inertia(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page->component('Beranda'));
    }

    public function test_jelajahi_page_renders_with_inertia(): void
    {
        $response = $this->get('/jelajahi');
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page->component('Event/Jelajahi'));
    }

    public function test_bantuan_page_renders_with_inertia(): void
    {
        $response = $this->get('/bantuan');
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page->component('Info/Bantuan'));
    }

    public function test_tentang_kami_page_renders_with_inertia(): void
    {
        $response = $this->get('/tentang-kami');
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page->component('Info/Tentang'));
    }

    public function test_login_page_renders_with_inertia(): void
    {
        $response = $this->get('/login');
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page->component('Auth/Login'));
    }

    public function test_auth_protected_routes_redirect_guest(): void
    {
        $this->get('/organizer/daftar')->assertRedirect('/login');
        $this->get('/event/buat')->assertRedirect('/login');
        $this->get('/tiket-saya')->assertRedirect('/login');
    }

    public function test_organizer_create_renders_for_authenticated_user(): void
    {
        $user = new Pengguna([
            'nama' => 'User Test',
            'email' => 'test@example.com',
            'no_telepon' => '081234567890',
        ]);
        $user->id_pengguna = 9999;

        $response = $this->actingAs($user)->get('/organizer/daftar');
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page->component('Organizer/Create'));
    }

    public function test_event_create_renders_for_user_with_organizer(): void
    {
        $user = new Pengguna([
            'nama' => 'User Test',
            'email' => 'test@example.com',
            'no_telepon' => '081234567890',
        ]);
        $user->id_pengguna = 9999;

        $organizer = new Organizer([
            'nama_organizer' => 'Org Test',
            'no_telepon' => '081234567890',
            'alamat' => 'Jakarta',
        ]);
        $organizer->id_organizer = 9999;
        $organizer->id_pengguna = 9999;

        $user->setRelation('organizer', $organizer);

        $response = $this->actingAs($user)->get('/event/buat');
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page->component('Event/Create'));
    }
}
