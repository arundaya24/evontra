import { Head, Link, router } from '@inertiajs/react';

export default function Saya({ pemesananList = [] }) {
    const handleBayar = (id) => {
        router.post(`/pemesanan/${id}/bayar`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Head title="Tiket Saya" />

            <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Daftar Tiket Saya</h1>
                    <p className="text-sm text-gray-500">Kelola riwayat pemesanan dan E-Ticket Anda</p>
                </div>
                <Link href="/beranda" className="text-sm text-blue-600 hover:underline">
                    ← Kembali ke Beranda
                </Link>
            </div>

            {pemesananList.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500 mb-3">Anda belum memiliki riwayat pemesanan tiket.</p>
                    <Link href="/jelajahi" className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Jelajahi Event
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {pemesananList.map((order) => (
                        <div key={order.id_pemesanan} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">{order.event?.nama_event || 'Event'}</h2>
                                    <p className="text-sm text-gray-500">
                                        Tanggal Pemesanan: {new Date(order.tanggal_pemesanan).toLocaleDateString('id-ID')}
                                    </p>
                                    <p className="text-sm text-gray-700 mt-1">
                                        Jumlah: <span className="font-semibold">{order.jumlah_tiket} tiket</span> — Total:{' '}
                                        <span className="font-semibold text-blue-600">
                                            Rp {Number(order.total_harga).toLocaleString('id-ID')}
                                        </span>
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        order.status === 'lunas'
                                            ? 'bg-green-100 text-green-800'
                                            : order.status === 'menunggu'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {order.status.toUpperCase()}
                                </span>
                            </div>

                            {order.status === 'menunggu' && (
                                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => handleBayar(order.id_pemesanan)}
                                        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
                                    >
                                        Bayar Sekarang (Simulasi)
                                    </button>
                                </div>
                            )}

                            {order.status === 'lunas' && order.tiket?.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">E-Ticket Aktif</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {order.tiket.map((tix) => (
                                            <div key={tix.id_tiket} className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
                                                <div>
                                                    <p className="font-mono text-xs text-gray-800 font-semibold">{tix.kode_qr}</p>
                                                    <p className="text-xs text-gray-500">Status: {tix.status}</p>
                                                </div>
                                                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-mono">
                                                    QR Valid
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
