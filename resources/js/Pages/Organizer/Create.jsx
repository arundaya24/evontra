import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama_organizer: '',
        no_telepon: '',
        alamat: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/organizer/daftar');
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <Head title="Daftar Profil Organizer" />

            <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Profil Organizer</h1>
                    <p className="text-sm text-gray-500">Lengkapi data organizer untuk mulai membuat event</p>
                </div>
                <Link href="/beranda" className="text-sm text-blue-600 hover:underline">
                    ← Kembali
                </Link>
            </div>

            <form onSubmit={submit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Organizer / Penyelenggara</label>
                    <input
                        type="text"
                        value={data.nama_organizer}
                        onChange={(e) => setData('nama_organizer', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Contoh: Evontra Media Kreatif"
                        required
                    />
                    {errors.nama_organizer && <p className="text-red-500 text-xs mt-1">{errors.nama_organizer}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                    <input
                        type="text"
                        value={data.no_telepon}
                        onChange={(e) => setData('no_telepon', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="081234567890"
                        required
                    />
                    {errors.no_telepon && <p className="text-red-500 text-xs mt-1">{errors.no_telepon}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Kantor / Domisili</label>
                    <textarea
                        value={data.alamat}
                        onChange={(e) => setData('alamat', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Jl. Sudirman No. 123, Jakarta"
                        required
                    />
                    {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>}
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Profil Organizer'}
                    </button>
                </div>
            </form>
        </div>
    );
}
