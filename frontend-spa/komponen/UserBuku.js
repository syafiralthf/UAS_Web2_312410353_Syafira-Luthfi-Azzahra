export default {
    template: `
        <div class="space-y-8 animate-in fade-in duration-300">
            <div class="bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] p-8 rounded-3xl text-white shadow-lg shadow-red-900/20">
                <h2 class="text-3xl font-bold tracking-tight">Marsya's Library</h2>
                <p class="text-red-100 text-sm mt-2 font-light italic">
                    Temukan koleksi manga pilihan Anda di sini.
                </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                    v-for="buku in listBuku"
                    :key="buku.id"
                    class="bg-white rounded-3xl border border-red-200 shadow-sm overflow-hidden flex flex-col justify-between p-6 hover:shadow-xl hover:shadow-red-100 transition-all duration-300"
                >
                    <div>
                        <div class="w-12 h-12 bg-red-50 text-[#7f1d1d] rounded-2xl flex items-center justify-center text-2xl font-bold mb-4">
                            🌸
                        </div>

                        <h3 class="font-bold text-slate-800 text-lg mb-1">
                            {{ buku.judul }}
                        </h3>

                        <p class="text-slate-500 text-sm mb-4">
                            Penulis:
                            <span class="font-medium text-[#7f1d1d]">
                                {{ buku.penulis }}
                            </span>
                        </p>
                    </div>

                    <div>
                        <div class="flex justify-between items-center mb-4 text-xs">
                            <span
                                class="px-3 py-1 rounded-full font-semibold"
                                :class="parseInt(buku.stok) > 0 ? 'bg-red-100 text-[#7f1d1d]' : 'bg-slate-100 text-slate-500'"
                            >
                                {{ parseInt(buku.stok) > 0 ? 'Tersedia' : 'Kosong' }}
                            </span>

                            <span class="text-slate-400 font-medium">
                                Stok: {{ buku.stok }}
                            </span>
                        </div>

                        <button
                            @click="pinjamBuku(buku)"
                            :disabled="parseInt(buku.stok) <= 0"
                            class="w-full py-2.5 px-4 rounded-full font-bold text-sm transition-all duration-200 text-center block"
                            :class="parseInt(buku.stok) > 0 ? 'bg-[#7f1d1d] hover:bg-[#991b1b] text-white shadow-md shadow-red-900/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed'"
                        >
                            {{ parseInt(buku.stok) > 0 ? 'Pinjam Manga' : 'Stok Habis' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,

    data() {
        return {
            listBuku: []
        };
    },

    methods: {
        async fetchBuku() {
            try {
                const response = await axios.get('http://localhost:8080/api/buku');
                this.listBuku = response.data;
            } catch (error) {
                console.error('Gagal memuat katalog buku:', error);
            }
        },

        pinjamBuku(buku) {
            alert(
                'Berhasil Meminjam!\n' +
                'Komik: ' + buku.judul + '\n' +
                'Silakan ambil buku digital Anda di menu koleksi.'
            );

            buku.stok = parseInt(buku.stok) - 1;
        }
    },

    mounted() {
        this.fetchBuku();
    }
};