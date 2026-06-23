export default {
    name: 'BukuManager',
    template: `
        <div class="p-6 font-sans">
            <!-- Header Kontrol & Tombol Tambah Buku -->
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-black text-slate-800 uppercase tracking-wider">
                    📋 Manajemen Data Buku & Komik
                </h2>
                <button 
                    @click="bukaModalTambah"
                    class="px-5 py-2.5 bg-red-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-900 transition-all shadow-md active:scale-95"
                >
                    ➕ Registrasi Buku Baru
                </button>
            </div>

            <!-- TABEL MOBILITAS BUKU -->
            <div class="overflow-x-auto rounded-2xl border border-slate-100 shadow-inner">
                <table class="w-full text-left border-collapse bg-white">
                    <thead class="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                        <tr>
                            <th class="p-4">Judul</th>
                            <th class="p-4">Penulis</th>
                            <th class="p-4">Genre / Kategori</th>
                            <th class="p-4 text-center">Stok</th>
                            <th class="p-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 text-sm">
                        <tr v-if="listBuku.length === 0">
                            <td colspan="5" class="p-8 text-center text-slate-400 font-medium">
                                Tidak ada data buku tersedia. Silakan tambahkan baru.
                            </td>
                        </tr>
                        <tr v-for="buku in listBuku" :key="buku.id" class="hover:bg-slate-50/50 transition">
                            <td class="p-4 font-bold text-slate-800">{{ buku.judul }}</td>
                            <td class="p-4 text-slate-500 font-medium">{{ buku.penulis }}</td>
                            <td class="p-4">
                                <span class="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold border border-slate-200/60 font-mono">
                                    {{ buku.nama_kategori || 'Tanpa Genre' }}
                                </span>
                            </td>
                            <td class="p-4 text-center font-bold font-mono">{{ buku.stok }} Pcs</td>
                            <td class="p-4 text-center space-x-1 whitespace-nowrap">
                                <button @click="bukaModalEdit(buku)" class="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-bold hover:bg-amber-600 transition">✏️</button>
                                <button @click="hapusBuku(buku.id)" class="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 transition">🗑️</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- MODAL REGISTRASI / EDIT BUKU -->
            <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
                <div class="bg-white rounded-[2rem] shadow-2xl border border-slate-100 w-full max-w-md p-8 relative animate-fade-in">
                    
                    <h3 class="text-2xl font-black text-slate-800 tracking-tight">
                        {{ formBuku.id ? 'Edit Data Buku' : 'Registrasi Buku' }}
                    </h3>
                    <p class="text-slate-400 font-medium text-xs mt-1 mb-6">
                        Lengkapi formulir di bawah ini dengan benar.
                    </p>

                    <div class="space-y-4">
                        <!-- Input Judul -->
                        <div class="flex flex-col gap-1">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Judul Buku</label>
                            <input 
                                v-model="formBuku.judul"
                                type="text" 
                                placeholder="Contoh: Naruto Vol. 72"
                                class="w-full px-4 py-3 bg-slate-50 text-slate-800 font-bold rounded-xl outline-none text-xs border border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                            />
                        </div>

                        <!-- Input Penulis -->
                        <div class="flex flex-col gap-1">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nama Penulis</label>
                            <input 
                                v-model="formBuku.penulis"
                                type="text" 
                                placeholder="Contoh: Masashi Kishimoto"
                                class="w-full px-4 py-3 bg-slate-50 text-slate-800 font-bold rounded-xl outline-none text-xs border border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                            />
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <!-- PERBAIKAN: Input Genre ID Angka Diganti Dropdown Pilihan Nama Genre -->
                            <div class="flex flex-col gap-1">
                                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Genre / Kategori</label>
                                <select 
                                    v-model="formBuku.kategori_id" 
                                    class="w-full px-3 py-3 bg-slate-50 text-slate-800 font-bold rounded-xl outline-none text-xs border border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all shadow-inner cursor-pointer"
                                >
                                    <option value="" disabled selected>-- Pilih Genre --</option>
                                    <option 
                                        v-for="kat in listKategori" 
                                        :key="kat.id" 
                                        :value="kat.id"
                                    >
                                        ✨ {{ kat.nama_kategori }}
                                    </option>
                                </select>
                            </div>

                            <!-- Input Jumlah Stok -->
                            <div class="flex flex-col gap-1">
                                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jumlah Stok</label>
                                <input 
                                    v-model.number="formBuku.stok"
                                    type="number" 
                                    min="0"
                                    class="w-full px-4 py-3 bg-slate-50 text-slate-800 font-bold rounded-xl outline-none text-xs border border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Tombol Aksi Kontrol Modal -->
                    <div class="flex justify-end items-center gap-3 mt-8 pt-4 border-t border-slate-100">
                        <button 
                            @click="tutupModal"
                            class="px-5 py-3 text-slate-500 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 rounded-xl transition"
                        >
                            Batal
                        </button>
                        <button 
                            @click="simpanDataBuku"
                            class="px-6 py-3 bg-red-800 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-red-900 transition shadow-md"
                        >
                            Simpan Data
                        </button>
                    </div>

                </div>
            </div>

        </div>
    `,

    data() {
        return {
            listBuku: [],
            listKategori: [], // Menampung daftar genre dari server
            isModalOpen: false,
            formBuku: {
                id: null,
                judul: '',
                penulis: '',
                kategori_id: '', // Di-set default teks kosong agar tulisan '-- Pilih Genre --' aktif pertama kali
                stok: 0
            }
        };
    },

    methods: {
        async fetchBuku() {
            try {
                const response = await axios.get('http://localhost:8080/api/buku');
                this.listBuku = response.data;
                // Emit data ke Dashboard.js biar statistiknya ikut terupdate otomatis
                this.$emit('data-loaded', this.listBuku);
            } catch (error) {
                console.error("Gagal mengambil data buku:", error);
            }
        },

        // MENGAMBIL DATA NAMA GENRE DARI DATABASE
        async fetchKategoriOptions() {
            try {
                const response = await axios.get('http://localhost:8080/api/kategori');
                this.listKategori = response.data;
            } catch (error) {
                console.error("Gagal mengambil opsi kategori genre:", error);
            }
        },

        bukaModalTambah() {
            this.resetForm();
            this.isModalOpen = true;
        },

        bukaModalEdit(buku) {
            this.formBuku = {
                id: buku.id,
                judul: buku.judul,
                penulis: buku.penulis,
                kategori_id: buku.kategori_id ? parseInt(buku.kategori_id) : '',
                stok: parseInt(buku.stok) || 0
            };
            this.isModalOpen = true;
        },

        tutupModal() {
            this.isModalOpen = false;
            this.resetForm();
        },

        resetForm() {
            this.formBuku = {
                id: null,
                judul: '',
                penulis: '',
                kategori_id: '',
                stok: 0
            };
        },

        async simpanDataBuku() {
            if (!this.formBuku.judul || !this.formBuku.kategori_id) {
                alert('Judul dan Kategori/Genre wajib dipilih!');
                return;
            }

            try {
                if (this.formBuku.id) {
                    // Mode Edit Data
                    await axios.put(`http://localhost:8080/api/buku/${this.formBuku.id}`, this.formBuku);
                    alert('Data buku berhasil diperbarui!');
                } else {
                    // Mode Tambah Baru
                    await axios.post('http://localhost:8080/api/buku', this.formBuku);
                    alert('Buku baru berhasil didaftarkan!');
                }
                this.tutupModal();
                this.fetchBuku(); // Refresh data tabel & statistik
            } catch (error) {
                console.error("Gagal menyimpan data buku:", error);
                alert('Gagal memproses data ke database.');
            }
        },

        async hapusBuku(id) {
            if (!confirm('Apakah Anda yakin ingin menghapus buku ini?')) return;
            try {
                await axios.delete(`http://localhost:8080/api/buku/${id}`);
                alert('Buku berhasil dihapus.');
                this.fetchBuku();
            } catch (error) {
                console.error("Gagal menghapus buku:", error);
            }
        }
    },

    mounted() {
        this.fetchBuku();
        this.fetchKategoriOptions(); // Otomatis dipanggil saat dashboard dibuka
    }
};