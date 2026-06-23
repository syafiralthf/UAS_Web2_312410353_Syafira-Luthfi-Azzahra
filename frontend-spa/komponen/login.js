export default {
    template: `
        <div class="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4 md:p-10 bg-slate-50 font-sans">
            
            <div class="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
                
                <div class="hidden md:flex md:col-span-5 bg-gradient-to-br from-rose-900 via-rose-800 to-amber-950 p-10 flex-col justify-between relative overflow-hidden text-white">
                    <div class="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    <div class="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    
                    <div class="relative z-10">
                        <span class="text-3xl">📖</span>
                        <h3 class="text-2xl font-black tracking-tight mt-4 text-rose-100">E-Library Admin</h3>
                    </div>

                    <div class="relative z-10 space-y-2">
                        <p class="text-xs uppercase tracking-widest font-black text-rose-300">Sirkulasi Data</p>
                        <p class="text-sm text-slate-200 font-medium leading-relaxed">
                            Silakan masuk untuk mengelola katalog, memperbarui stok komik, dan memantau log riwayat peminjaman.
                        </p>
                    </div>
                </div>

                <div class="col-span-12 md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
                    
                    <div class="mb-8">
                        <h2 class="text-3xl font-black text-rose-950 tracking-tight">Selamat Datang Kembali</h2>
                        <p class="text-slate-400 text-xs font-semibold mt-1">Masukkan kredensial administrator Anda untuk melanjutkan.</p>
                    </div>

                    <form @submit.prevent="submitLogin" class="space-y-5">
                        
                        <div class="space-y-1.5">
                            <label for="username" class="text-xs font-black uppercase tracking-wider text-rose-900">Username</label>
                            <div class="relative">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">👤</span>
                                <input
                                    v-model="username"
                                    type="text"
                                    id="username"
                                    required
                                    class="w-full pl-11 pr-5 py-3.5 bg-slate-50 border-2 border-slate-200 focus:border-rose-800 focus:bg-white rounded-2xl outline-none transition-all text-slate-800 text-sm font-medium"
                                    placeholder="Masukkan username admin...">
                            </div>
                        </div>

                        <div class="space-y-1.5">
                            <label for="password" class="text-xs font-black uppercase tracking-wider text-rose-900">Password</label>
                            <div class="relative">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔑</span>
                                <input
                                    v-model="password"
                                    type="text"
                                    id="password"
                                    required
                                    class="w-full pl-11 pr-12 py-3.5 bg-slate-50 border-2 border-slate-200 focus:border-rose-800 focus:bg-white rounded-2xl outline-none transition-all text-slate-800 text-sm font-medium"
                                    placeholder="••••••••">

                                <button
                                    type="button"
                                    @click="togglePasswordVisibility"
                                    class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-800 transition-colors p-1 text-sm font-bold">
                                    {{ isPasswordVisible ? 'SEMBUNYIKAN' : 'LIHAT' }}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            class="w-full py-4 mt-4 bg-rose-800 hover:bg-rose-900 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-900/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]">
                            Otentikasi Akun ➔
                        </button>
                    </form>

                    <div class="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure Administrator Area</p>
                    </div>

                </div>
            </div>
        </div>
    `,
    
    data() {
        return {
            username: '',
            password: '',
            isPasswordVisible: false // Mengganti logika pembantu penamaan variabel agar lebih clean
        }
    },

    methods: {
        togglePasswordVisibility(e) {
            // Logika kustom mengganti tipe input secara langsung demi akurasi rendering SPA
            const input = e.target.closest('.relative').querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                this.isPasswordVisible = true;
            } else {
                input.type = 'password';
                this.isPasswordVisible = false;
            }
        },
        async submitLogin() {
            try {
                const response = await axios.post(
                    'http://localhost:8080/api/auth/login',
                    {
                        username: this.username,
                        password: this.password
                    }
                );

                if (response.data.token) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('token', response.data.token);

                    alert('Login Berhasil!');
                    this.$router.push('/dashboard');
                }
            } catch (error) {
                alert('Login Gagal, Coba Lagi.');
            }
        }
    }
}