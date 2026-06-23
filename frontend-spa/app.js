import Login from './komponen/Login.js';
import Dashboard from './komponen/Dashboard.js';
import Kategori from './komponen/Kategori.js';

const Home = {
    template: `
        <div class="min-h-screen bg-slate-50 font-sans pb-24">
            
            <div class="border-b border-slate-200 bg-white">
                <div class="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div class="lg:col-span-7 space-y-6">
                        <div class="inline-flex items-center gap-2 bg-red-50 text-[#880d30] px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                            ✨ E-Library Digital Space
                        </div>
                        <h2 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
                            Temukan Ruang Baca <br>
                            <span style="color: #880d30;">Tanpa Batas Kamu.</span>
                        </h2>
                        <p class="text-slate-500 text-base md:text-lg font-medium max-w-xl leading-relaxed">
                            Akses ratusan koleksi buku ilmiah dan komik digital premium secara instan. Sistem peminjaman mandiri, cepat, dan sepenuhnya efisien.
                        </p>
                    </div>
                    
                    <div class="lg:col-span-5 grid grid-cols-2 gap-4">
                        <div class="bg-[#880d30] p-6 rounded-2xl border-2 border-[#a3143d] shadow-md">
                            <span class="text-2xl">⚡</span>
                            <h4 class="font-bold text-white mt-2 text-sm">Proses Cepat</h4>
                            <p class="text-xs text-white/90 mt-0.5 font-medium">Input nama langsung pinjam.</p>
                        </div>
                        
                        <div class="bg-[#880d30] p-6 rounded-2xl border-2 border-[#a3143d] shadow-md">
                            <span class="text-2xl">📚</span>
                            <h4 class="font-bold text-white mt-2 text-sm">Koleksi Update</h4>
                            <p class="text-xs text-white/90 mt-0.5 font-medium">Komik & buku terbaru.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-7xl mx-auto px-6 mt-12 space-y-4">
                <div style="background-color: #880d30;" class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border-2 border-[#a3143d] shadow-lg">
                    <div class="flex-1 relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 text-base">🔍</span>
                        <input 
                            v-model="searchQuery" 
                            type="text" 
                            placeholder="Ketik judul buku, komik, atau nama penulis..." 
                            class="w-full pl-12 pr-10 py-3.5 bg-white text-slate-800 placeholder-slate-400 font-bold rounded-xl outline-none text-sm border-2 border-slate-100 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all shadow-inner"
                        />
                        <button v-if="searchQuery" @click="searchQuery = ''" class="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-rose-800 font-bold text-sm">✕</button>
                    </div>
                    
                    <div class="flex items-center gap-2 text-xs font-bold bg-white text-[#880d30] px-4 py-3.5 rounded-xl border-2 border-white/20 shadow-sm whitespace-nowrap">
                        TOTAL: <span class="font-mono text-base font-black px-1.5">{{ filteredBuku.length }}</span> KOLEKSI TERDISPLAY
                    </div>
                </div>

                <div class="flex flex-wrap items-center gap-2 px-1">
                    <span class="text-xs font-extrabold text-slate-400 uppercase tracking-wider mr-2">Filter Genre:</span>
                    
                    <button 
                        @click="selectedKategori = null"
                        :class="selectedKategori === null ? 'bg-[#880d30] text-white border-[#880d30]' : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200'"
                        class="px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs border"
                    >
                        📚 Semua Genre
                    </button>

                    <button 
                        v-for="kat in listKategori" 
                        :key="kat.id"
                        @click="selectedKategori = kat.id"
                        :class="selectedKategori === kat.id ? 'bg-[#880d30] text-white border-[#880d30]' : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200'"
                        class="px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs border"
                    >
                        ✨ {{ kat.nama_kategori }}
                    </button>
                </div>
            </div>

            <div class="max-w-7xl mx-auto px-6 mt-8">
                <div v-if="filteredBuku.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div 
                        v-for="buku in filteredBuku" 
                        :key="buku.id"
                        class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                    >
                        <div class="p-6 pb-4">
                            <div class="flex items-start justify-between gap-2 mb-4">
                                <div class="w-10 h-10 bg-slate-50 text-slate-700 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                                    📖
                                </div>
                                <span :class="parseInt(buku.stok) > 0 ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 'text-red-700 bg-red-50 border border-red-100'" class="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                    {{ parseInt(buku.stok) > 0 ? 'Tersedia' : 'Habis' }}
                                </span>
                            </div>

                            <h3 class="font-bold text-slate-800 text-lg leading-tight line-clamp-2 min-h-[3.5rem] group-hover:text-[#880d30] transition-colors">
                                {{ buku.judul }}
                            </h3>
                            
                            <div class="flex items-center gap-1.5 text-xs font-medium text-slate-400 mt-1">
                                <span>Penulis:</span>
                                <span class="text-slate-600 font-semibold truncate max-w-[150px]">{{ buku.penulis }}</span>
                            </div>

                            <div v-if="buku.nama_kategori" class="inline-block mt-2 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60 font-mono">
                                {{ buku.nama_kategori }}
                            </div>
                        </div>

                        <div class="p-6 pt-0 space-y-4">
                            <div class="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-400">
                                <span>KETERSEDIAAN STOK</span>
                                <span class="text-slate-800 font-mono text-sm font-black">{{ buku.stok }} Pcs</span>
                            </div>

                            <button
                                @click="pinjamBuku(buku)"
                                :disabled="parseInt(buku.stok) <= 0"
                                style="background-color: #880d30;"
                                class="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all duration-300 active:scale-98 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed opacity-95 hover:opacity-100 shadow-sm"
                            >
                                {{ parseInt(buku.stok) > 0 ? 'Pinjam Sekarang' : 'Stok Kosong' }}
                            </button>
                        </div>
                    </div>
                </div>
                
                <div v-else-if="listBuku.length > 0" class="text-center py-16 bg-[#880d30] rounded-2xl border-2 border-[#a3143d] max-w-sm mx-auto p-8 shadow-xl animate-fade-in">
                    <p class="text-3xl">🔍</p>
                    <h4 class="font-bold text-white text-base mt-2">Pencarian Tidak Ditemukan</h4>
                    <p class="text-xs text-white/80 mt-1 font-medium">Koleksi tidak ditemukan berdasarkan filter kata kunci atau genre aktif.</p>
                </div>
            </div>
        </div>
    `,

    data() {
        return {
            listBuku: [],
            listKategori: [],
            selectedKategori: null,
            searchQuery: ''
        };
    },

    computed: {
        filteredBuku() {
            let hasil = this.listBuku;

            if (this.selectedKategori !== null) {
                hasil = hasil.filter(buku => parseInt(buku.kategori_id) === parseInt(this.selectedKategori));
            }

            const query = this.searchQuery.toLowerCase().trim();
            if (query) {
                hasil = hasil.filter(buku => {
                    const judul = buku.judul ? buku.judul.toLowerCase() : '';
                    const penulis = buku.penulis ? buku.penulis.toLowerCase() : '';
                    return judul.includes(query) || penulis.includes(query);
                });
            }

            return hasil;
        }
    },

    methods: {
        async fetchKatalog() {
            try {
                const response = await axios.get('http://localhost:8080/api/buku');
                this.listBuku = response.data;
            } catch (error) {
                console.error("Gagal memuat katalog buku:", error);
            }
        },

        async fetchKategoriOptions() {
            try {
                const response = await axios.get('http://localhost:8080/api/kategori');
                this.listKategori = response.data;
            } catch (error) {
                console.error("Gagal memuat kategori filter:", error);
            }
        },

        pinjamBuku(buku) {
            const nama = prompt('Masukkan nama lengkap Anda:');
            if (!nama || nama.trim() === '') return;

            axios.post('http://localhost:8080/api/peminjaman', {
                buku_id: buku.id,
                nama_peminjam: nama
            })
            .then(() => {
                alert('Sukses meminjam buku!');
                buku.stok = parseInt(buku.stok) - 1;
            })
            .catch(() => {
                alert('Gagal meminjam.');
            });
        }
    },

    mounted() {
        this.fetchKatalog();
        this.fetchKategoriOptions();
    }
};

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
        { path: '/kategori', component: Kategori, meta: { requiresAuth: true } }
    ]
});

router.beforeEach((to, from, next) => {
    const isAuth = localStorage.getItem('isLoggedIn') === 'true';
    if (to.meta.requiresAuth && !isAuth) {
        next('/login');
    } else {
        next();
    }
});

const app = Vue.createApp({
    data() {
        return {
            isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
        };
    },
    methods: {
        logout() {
            localStorage.clear();
            this.isLoggedIn = false;
            window.location.reload();
        }
    }
});

app.use(router);
app.mount('#app');