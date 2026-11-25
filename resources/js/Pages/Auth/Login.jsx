import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Head title="Masuk" />

            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Masuk ke Akun</h1>
                    <p className="text-sm text-gray-500 mt-1">Masukkan email dan password untuk melanjutkan</p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="nama@email.com"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="••••••••"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                        {processing ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <Link href="/beranda" className="text-blue-600 hover:underline">
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}
