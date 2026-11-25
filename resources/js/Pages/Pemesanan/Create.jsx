import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ event = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        jumlah_tiket: 1,
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/event/${event.id_event}/pesan`);
    };

    const totalHarga = (Number(event.harga_tiket) || 0) * (Number(data.jumlah_tiket) || 1);

    return (
        <div className="max-w-lg mx-auto p-6">
            <Head title={`Pesan Tiket - ${event.nama_event || 'Event'}`} />

            <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pemesanan Tiket</h1>
                    <p className="text-sm text-gray-500">{event.nama_event}</p>
                </div>
                <Link href="/beranda" className="text-sm text-blue-600 hover:underline">
                    ← Kembali
                </Link>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
                <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                    <h2 className="font-bold text-gray-900 text-lg">{event.nama_event}</h2>
                    <p className="text-sm text-gray-600">Lokasi: {event.lokasi}</p>
                    <p className="text-sm text-gray-600">Tanggal: {event.tanggal_event}</p>
                    <p className="text-sm font-semibold text-blue-600">
                        Harga Satuan: Rp {Number(event.harga_tiket || 0).toLocaleString('id-ID')}
                    </p>
                    <p className="text-xs text-gray-400">Sisa Kuota: {event.kuota_tiket} tiket</p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Tiket</label>
                        <input
                            type="number"
                            min="1"
                            max={event.kuota_tiket || 10}
                            value={data.jumlah_tiket}
                            onChange={(e) => setData('jumlah_tiket', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        {errors.jumlah_tiket && <p className="text-red-500 text-xs mt-1">{errors.jumlah_tiket}</p>}
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Pembayaran:</span>
                        <span className="text-xl font-bold text-gray-900">
                            Rp {totalHarga.toLocaleString('id-ID')}
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Memproses Pesanan...' : 'Konfirmasi & Pesan Tiket'}
                    </button>
                </form>
            </div>
        </div>
    );
}
