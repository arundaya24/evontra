import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Jelajahi({ events = { data: [] }, kategoriList = [], filters = { q: '', kategori: '' } }) {
    const [search, setSearch] = useState(filters.q || '');
    const [selectedKategori, setSelectedKategori] = useState(filters.kategori || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/jelajahi', { q: search, kategori: selectedKategori }, { preserveState: true });
    };

    const handleKategoriChange = (kat) => {
        const newKat = selectedKategori === kat ? '' : kat;
        setSelectedKategori(newKat);
        router.get('/jelajahi', { q: search, kategori: newKat }, { preserveState: true });
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <Head title="Jelajahi Event" />

            <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Jelajahi Event</h1>
                    <p className="text-sm text-gray-500">Temukan berbagai event menarik di sekitarmu</p>
                </div>
                <Link href="/beranda" className="text-sm text-blue-600 hover:underline">
                    ← Kembali ke Beranda
                </Link>
            </div>

            <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama event..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Cari
                </button>
            </form>

            {kategoriList.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {kategoriList.map((kat) => (
                        <button
                            key={kat}
                            type="button"
                            onClick={() => handleKategoriChange(kat)}
                            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                                selectedKategori === kat
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {kat}
                        </button>
                    ))}
                </div>
            )}

            <main>
                {(!events?.data || events.data.length === 0) ? (
                    <div className="p-8 text-center bg-white rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500">Tidak ada event yang ditemukan.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.data.map((item) => (
                            <div key={item.id_event} className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                                        {item.kategori}
                                    </span>
                                    <h3 className="text-lg font-bold mt-2 text-gray-900">{item.nama_event}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{item.lokasi}</p>
                                    <p className="text-sm font-semibold text-gray-800 mt-2">
                                        Rp {Number(item.harga_tiket).toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
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
