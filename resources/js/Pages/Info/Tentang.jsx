import { Head, Link } from '@inertiajs/react';

export default function Tentang({ kontak = [] }) {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <Head title="Tentang Kami" />

            <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tentang Evontra</h1>
                    <p className="text-sm text-gray-500">Platform tiket event modern dan terpercaya</p>
                </div>
                <Link href="/beranda" className="text-sm text-blue-600 hover:underline">
                    ← Kembali ke Beranda
                </Link>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Visi & Misi</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Evontra mempermudah penyelenggara event dan pengunjung dalam mengelola pemesanan tiket,
                        konfirmasi pembayaran instan, dan penerbitan tiket elektronik ber-QR Code secara aman dan cepat.
                    </p>
                </div>

                {kontak.length > 0 && (
                    <div className="pt-4 border-t border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Informasi Kontak Layanan</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {kontak.map((item) => (
                                <div key={item.id_kontak} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-xs text-gray-500 font-medium uppercase">{item.tipe || 'Kontak'}</p>
                                    <p className="text-sm text-gray-900 font-semibold mt-1">{item.nilai || item.kontak || item.keterangan}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
