import { Head, Link, usePage } from '@inertiajs/react';

export default function Beranda({ rekomendasi = [] }) {
    const { auth } = usePage().props;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <Head title="Beranda" />

            <header className="flex justify-between items-center pb-6 border-b border-gray-200">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Evontra</h1>
                    <p className="text-sm text-gray-500">Platform Pemesanan Tiket Event</p>
                </div>
                <nav className="flex items-center gap-4">
                    <Link href="/jelajahi" className="text-gray-600 hover:text-gray-900">Jelajahi</Link>
                    <Link href="/bantuan" className="text-gray-600 hover:text-gray-900">Bantuan</Link>
                    <Link href="/tentang-kami" className="text-gray-600 hover:text-gray-900">Tentang Kami</Link>
                    {auth?.user ? (
                        <div className="flex items-center gap-3">
                            <Link href="/tiket-saya" className="text-blue-600 hover:underline">Tiket Saya</Link>
                            <span className="text-gray-700 font-medium">Halo, {auth.user.nama}</span>
                            <Link href="/logout" method="post" as="button" className="text-red-500 hover:underline text-sm">
                                Keluar
                            </Link>
                        </div>
                    ) : (
                        <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Masuk
                        </Link>
                    )}
                </nav>
            </header>

            <main className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Event Rekomendasi</h2>
                {rekomendasi.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500">Belum ada event rekomendasi yang dipublikasikan saat ini.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rekomendasi.map((item) => (
                            <div key={item.id_event} className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                                        {item.kategori}
                                    </span>
                                    <h3 className="text-lg font-bold mt-2 text-gray-900">{item.nama_event}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{item.lokasi}</p>
                                    <p className="text-sm text-gray-600 mt-2 font-semibold">
                                        Rp {Number(item.harga_tiket).toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-xs text-gray-400">Kuota: {item.kuota_tiket}</span>
                                    <Link
                                        href={`/event/${item.id_event}/pesan`}
                                        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                    >
                                        Pesan Tiket
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
