import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama_event: '',
        deskripsi: '',
        kategori: '',
        lokasi: '',
        tanggal_event: '',
        harga_tiket: '',
        kuota_tiket: '',
        status: 'draft',
        is_rekomendasi: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/event/buat');
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <Head title="Buat Event Baru" />

            <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Buat Event Baru</h1>
                    <p className="text-sm text-gray-500">Lengkapi informasi detail event</p>
                </div>
                <Link href="/beranda" className="text-sm text-blue-600 hover:underline">
                    ← Kembali
                </Link>
            </div>

            <form onSubmit={submit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Event</label>
                    <input
                        type="text"
                        value={data.nama_event}
                        onChange={(e) => setData('nama_event', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                    {errors.nama_event && <p className="text-red-500 text-xs mt-1">{errors.nama_event}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                    <textarea
                        value={data.deskripsi}
                        onChange={(e) => setData('deskripsi', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                    {errors.deskripsi && <p className="text-red-500 text-xs mt-1">{errors.deskripsi}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                        <input
                            type="text"
                            value={data.kategori}
                            onChange={(e) => setData('kategori', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Musik, Seminar, Workshop"
                            required
                        />
                        {errors.kategori && <p className="text-red-500 text-xs mt-1">{errors.kategori}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                        <input
                            type="text"
                            value={data.lokasi}
                            onChange={(e) => setData('lokasi', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        {errors.lokasi && <p className="text-red-500 text-xs mt-1">{errors.lokasi}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Event</label>
                        <input
                            type="date"
                            value={data.tanggal_event}
                            onChange={(e) => setData('tanggal_event', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        {errors.tanggal_event && <p className="text-red-500 text-xs mt-1">{errors.tanggal_event}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Harga Tiket (Rp)</label>
                        <input
                            type="number"
                            min="0"
                            value={data.harga_tiket}
                            onChange={(e) => setData('harga_tiket', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        {errors.harga_tiket && <p className="text-red-500 text-xs mt-1">{errors.harga_tiket}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kuota Tiket</label>
                        <input
                            type="number"
                            min="1"
                            value={data.kuota_tiket}
                            onChange={(e) => setData('kuota_tiket', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        {errors.kuota_tiket && <p className="text-red-500 text-xs mt-1">{errors.kuota_tiket}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status Publikasi</label>
                    <select
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="draft">Draft</option>
                        <option value="dipublikasikan">Dipublikasikan</option>
                    </select>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                    <Link href="/beranda" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Event'}
                    </button>
                </div>
            </form>
        </div>
    );
}
