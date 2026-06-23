export default {
    template: `
        <div class="min-h-screen bg-slate-100 p-4 md:p-8 space-y-8 font-sans">
            
            <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
                
                <div class="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                    <div class="space-y-1">
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Judul Koleksi</p>
                        <h3 class="text-3xl font-black text-slate-800">{{ totalJudul }} <span class="text-sm font-semibold text-slate-500">Judul</span></h3>
                    </div>
                    <div style="background-color: #880d30;" class="w-12 h-12 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-sm">
                        📚
                    </div>
                </div>

                <div class="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                    <div class="space-y-1">
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Keseluruhan Stok</p>
                        <h3 class="text-3xl font-black text-slate-800">{{ totalStok }} <span class="text-sm font-semibold text-slate-500">Pcs</span></h3>
                    </div>
                    <div style="background-color: #880d30;" class="w-12 h-12 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-sm">
                        📦
                    </div>
                </div>

                <div class="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                    <div class="space-y-1">
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Koleksi Stok Habis</p>
                        <h3 style="color: #880d30;" class="text-3xl font-black">{{ totalKosong }} <span class="text-sm font-semibold text-slate-500">Judul</span></h3>
                    </div>
                    <div class="w-12 h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-sm">
                        ⚠️
                    </div>
                </div>
            </div>

            <div class="max-w-7xl mx-auto bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
                
                <div style="background-color: #880d30;" class="p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 class="text-xl font-bold text-white tracking-tight">Manajemen Database Buku & Komik</h2>
                        <p class="text-red-100/80 text-xs mt-0.5">Kelola data sirkulasi, judul buku, kategori, dan jumlah stok perpustakaan.</p>
                    </div>
                    <button @click="openModal('add')" style="color: #880d30;" class="bg-white hover:bg-red-50 px-5 py-3 rounded-xl text-xs font-black tracking-wider uppercase transition-all shadow-md flex items-center gap-2">
                        <span>+</span> Tambah Buku Baru
                    </button>
                </div>

                <div class="overflow-x-auto bg-white">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="border-b border-slate-200 bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                                <th class="p-4 pl-6">Detail Buku / Komik</th>
                                <th class="p-4">Nama Penulis</th>
                                <th class="p-4 text-center">Genre / Kategori</th>
                                <th class="p-4 text-center">Sisa Stok</th>
                                <th class="p-4 pr-6 text-center">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-sm bg-white">
                            <tr v-for="buku in listBuku" :key="buku.id" class="hover:bg-slate-50/80 transition-colors text-slate-700">
                                <td class="p-4 pl-6 font-bold text-slate-900">{{ buku.judul }}</td>
                                <td class="p-4 text-slate-600 font-medium">{{ buku.penulis }}</td>
                                
                                <td class="p-4 text-center">
                                    <span class="bg-slate-100 px-2.5 py-1 rounded-md text-xs border border-slate-200 text-slate-600 font-bold">
                                        {{ getNamaKategori(buku.kategori_id) }}
                                    </span>
                                </td>
                                
                                <td class="p-4 text-center">
                                    <span v-if="buku.stok === 0" style="color: #880d30; border-color: rgba(136, 13, 48, 0.2);" class="bg-red-50 border px-2.5 py-1 rounded-md text-xs font-bold">
                                        Habis
                                    </span>
                                    <span v-else class="text-slate-800 font-bold font-mono">
                                        {{ buku.stok }}
                                    </span>
                                </td>
                                <td class="p-4 pr-6 text-center">
                                    <div class="inline-flex rounded-lg border border-slate-200 shadow-sm overflow-hidden bg-white">
                                        <button @click="openModal('edit', buku)" class="px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 border-r border-slate-200 transition-colors">EDIT</button>
                                        <button @click="deleteBuku(buku.id)" class="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors">HAPUS</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="max-w-7xl mx-auto bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
                <div style="background-color: #880d30;" class="p-6">
                    <h2 class="text-lg font-bold text-white tracking-tight">Log Riwayat Peminjaman</h2>
                </div>

                <div class="overflow-x-auto bg-white">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="border-b border-slate-200 bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                                <th class="p-4 pl-6">Nama Peminjam</th>
                                <th class="p-4">Judul Buku Terpinjam</th>
                                <th class="p-4">Tanggal Transaksi</th>
                                <th class="p-4 text-center">Status Berjalan</th>
                                <th class="p-4 pr-6 text-center">Aksi Manajemen</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-sm bg-white">
                            <tr v-for="log in listPeminjaman" :key="log.id" class="hover:bg-slate-50/80 transition-colors text-slate-700">
                                <td class="p-4 pl-6 font-semibold text-slate-900 flex items-center gap-2">
                                    <div class="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center text-xs text-slate-600 font-bold uppercase">{{ log.nama_peminjam.substring(0, 2) }}</div>
                                    {{ log.nama_peminjam }}
                                </td>
                                <td class="p-4 font-medium text-slate-800">{{ log.judul }}</td>
                                <td class="p-4 text-slate-400 text-xs font-mono">{{ log.tanggal_pinjam }}</td>
                                <td class="p-4 text-center">
                                    <span :class="log.status === 'Dipinjam' ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'" class="px-3 py-1 rounded-full text-xs font-bold border">
                                        {{ log.status }}
                                    </span>
                                </td>
                                <td class="p-4 pr-6 text-center">
                                    <button v-if="log.status === 'Dipinjam'" @click="kembalikanBuku(log.id)" style="border-color: #880d30; color: #880d30;" class="bg-white border px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all hover:bg-red-50">
                                        Kembalikan Buku
                                    </button>
                                    <span v-else class="text-slate-300 text-xs font-medium">— Selesai</span>
                                </td>
                            </tr>
                            <tr v-if="listPeminjaman.length === 0">
                                <td colspan="5" class="p-6 text-center text-slate-400 font-medium">Belum ada riwayat aktivitas peminjaman.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-if="showModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div class="bg-white w-full max-w-md p-6 md:p-8 rounded-2xl border border-slate-200 shadow-2xl">
                    <div class="mb-6">
                        <h3 class="text-lg font-bold text-slate-900">{{ modalMode === 'add' ? 'Registrasi' : 'Perbarui Data' }} Buku</h3>
                        <p class="text-xs text-slate-400 mt-0.5">Lengkapi formulir di bawah ini dengan benar.</p>
                    </div>
                    <form @submit.prevent="saveBuku" class="space-y-4">
                        <div class="space-y-1">
                            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Judul Buku</label>
                            <input v-model="form.judul" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl outline-none text-sm transition-all text-slate-800" placeholder="Contoh: Naruto Vol. 72" required>
                        </div>
                        <div class="space-y-1">
                            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Penulis</label>
                            <input v-model="form.penulis" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl outline-none text-sm transition-all text-slate-800" placeholder="Contoh: Masashi Kishimoto" required>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            
                            <div class="space-y-1">
                                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Genre / Kategori</label>
                                <select 
                                    v-model="form.kategori_id" 
                                    class="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm transition-all text-slate-800 font-semibold cursor-pointer" 
                                    required
                                >
                                    <option value="" disabled selected>-- Pilih Genre --</option>
                                    <option 
                                        v-for="kat in listKategori" 
                                        :key="kat.id" 
                                        :value="kat.id"
                                    >
                                        {{ kat.nama_kategori }}
                                    </option>
                                </select>
                            </div>
                            
                            <div class="space-y-1">
                                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Jumlah Stok</label>
                                <input v-model.number="form.stok" type="number" min="0" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl outline-none text-sm transition-all text-slate-800" required>
                            </div>
                        </div>
                        <div class="flex justify-end gap-2 pt-4 border-t border-slate-100 mt-6">
                            <button @click="showModal = false" type="button" class="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">BATAL</button>
                            <button type="submit" style="background-color: #880d30;" class="px-5 py-2.5 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors opacity-90 hover:opacity-100">SIMPAN DATA</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return { 
            listBuku: [], 
            listPeminjaman: [], 
            listKategori: [], // <-- Tambahan state untuk menampung data nama-nama genre
            showModal: false, 
            modalMode: 'add', 
            form: { id: null, judul: '', penulis: '', kategori_id: '', stok: 0 } 
        }
    },
    computed: {
        totalJudul() { return this.listBuku.length; },
        totalStok() { return this.listBuku.reduce((accum, item) => accum + (parseInt(item.stok) || 0), 0); },
        totalKosong() { return this.listBuku.filter(item => parseInt(item.stok) === 0).length; }
    },
    mounted() { 
        this.fetchBuku(); 
        this.fetchRiwayatPeminjaman(); 
        this.fetchKategoriOptions(); // <-- Tambahan pemanggilan list genre saat aplikasi dimuat
    },
    methods: {
        async fetchBuku() {
            try {
                const res = await axios.get('http://localhost:8080/api/buku', {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                this.listBuku = res.data;
            } catch (err) { console.error(err); }
        },
        async fetchRiwayatPeminjaman() {
            try {
                const res = await axios.get('http://localhost:8080/api/peminjaman', {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                this.listPeminjaman = res.data;
            } catch (err) { console.error(err); }
        },
        // MENGAMBIL DAFTAR KATEGORI/GENRE DARI ENDPOINT BACKEND
        async fetchKategoriOptions() {
            try {
                const res = await axios.get('http://localhost:8080/api/kategori', {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                this.listKategori = res.data;
            } catch (err) { console.error("Gagal mengambil data kategori:", err); }
        },
        // UTILITY METHOD: Mengonversi ID Kategori menjadi String Nama Kategori di Tabel
        getNamaKategori(id) {
            const kategori = this.listKategori.find(k => k.id === parseInt(id));
            return kategori ? kategori.nama_kategori : 'ID: ' + id;
        },
        openModal(mode, data = null) {
            this.modalMode = mode;
            // Jika mode add, beri string kosong pada kategori_id agar option default terpilih
            this.form = data ? { ...data } : { judul: '', penulis: '', kategori_id: '', stok: 0 };
            this.showModal = true;
        },
        async saveBuku() {
            try {
                const isEdit = this.modalMode === 'edit';
                const url = isEdit ? 'http://localhost:8080/api/buku/update/' + this.form.id : 'http://localhost:8080/api/buku';
                await axios.post(url, this.form, {
                    headers: { 
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json' 
                    }
                });
                this.showModal = false;
                this.fetchBuku();
            } catch (err) { alert('Gagal menyimpan data.'); }
        },
        async deleteBuku(id) {
            if (confirm('Yakin ingin menghapus?')) {
                try {
                    await axios.delete('http://localhost:8080/api/buku/' + id, {
                        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                    });
                    this.fetchBuku();
                } catch (err) { alert('Gagal menghapus'); }
            }
        },
        async kembalikanBuku(id) {
            try {
                await axios.put('http://localhost:8080/api/peminjaman/' + id, { status: 'Dikembalikan' }, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                this.fetchRiwayatPeminjaman();
                this.fetchBuku(); 
            } catch (err) { alert('Gagal mengupdate status!'); }
        }
    }
}