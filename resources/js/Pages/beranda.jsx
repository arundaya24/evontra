import { Head, Link, usePage } from '@inertiajs/react';

export default function Beranda({ rekomendasi }) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Beranda" />

            <main style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1>Event Rekomendasi</h1>
                    <div>
                        {auth.user ? (
                            <span>Halo, {auth.user.nama}</span>
                        ) : (
                            <Link href="/login">Masuk</Link>
                        )}
                    </div>
                </header>

                <section style={{ marginTop: '1.5rem' }}>
                    {rekomendasi.length === 0 ? (
                        <p>Belum ada event rekomendasi yang dipublikasikan.</p>
                    ) : (
                        rekomendasi.map((item) => (
                            <div
                                key={item.id_event}
                                style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}
                            >
                                <h2>{item.nama_event}</h2>
                                <p>{item.kategori} — {item.lokasi}</p>
                                <p>Harga: Rp {Number(item.harga_tiket).toLocaleString('id-ID')}</p>
                                <Link href={`/event/${item.id_event}/pesan`}>Pesan Tiket</Link>
                            </div>
                        ))
                    )}
                </section>
            </main>
        </>
    );
}
