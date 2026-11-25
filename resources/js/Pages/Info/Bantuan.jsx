import { Head, Link } from '@inertiajs/react';

export default function Bantuan({ panduan = [] }) {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <Head title="Pusat Bantuan" />

            <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pusat Bantuan</h1>
                    <p className="text-sm text-gray-500">Temukan jawaban untuk pertanyaan yang sering diajukan</p>
                </div>
                <Link href="/beranda" className="text-sm text-blue-600 hover:underline">
                    ← Kembali ke Beranda
                </Link>
            </div>

            {panduan.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500">Belum ada panduan bantuan yang ditambahkan.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {panduan.map((item) => (
                        <div key={item.id_panduan} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <h2 className="font-semibold text-gray-900 text-base">{item.judul}</h2>
                            <p className="text-sm text-gray-600 mt-2 leading-relaxed whitespace-pre-line">{item.isi}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
