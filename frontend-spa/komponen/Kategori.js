export default {
    template: `
        <div class="min-h-screen bg-slate-100 p-4 md:p-8 space-y-8 font-sans">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
                
                <div style="background-color: #880d30;" class="p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 class="text-xl font-bold text-white tracking-tight">Manajemen Genre / Kategori Buku</h2>
                        <p class="text-red-100/80 text-xs mt-0.5">Kelola daftar genre seperti Shounen, Seinen, Romance, atau Edukasi.</p>
                    </div>
                    <button @click="openModal('add')" style="color: #880d30;" class="bg-white hover:bg-red-50 px-5 py-3 rounded-xl text-xs font-black tracking-wider uppercase transition-all shadow-md flex items-center gap-2">
                        <span>+</span> Tambah Kategori
                    </button>
                </div>

                <div class="overflow-x-auto bg-white">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="border-b border-slate-200 bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                                <th class="p-4 pl-6 w-24">Genre ID</th>
                                <th class="p-4">Nama Kategori / Genre</th>
                                <th class="p-4 pr-6 text-center w-40">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-sm bg-white">
                            <tr v-for="kat in listKategori" :key="kat.id" class="hover:bg-slate-50/80 transition-colors text-slate-700">
                                <td class="p-4 pl-6 font-mono font-bold text-slate-600">#{{ kat.id }}</td>
                                <td class="p-4 font-bold text-slate-900">{{ kat.nama_kategori }}</td>
                                <td class="p-4 pr-6 text-center">
                                    <div class="inline-flex rounded-lg border border-slate-200 shadow-sm overflow-hidden bg-white">
                                        <button @click="openModal('edit', kat)" class="px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 border-r border-slate-200 transition-colors">EDIT</button>
                                        <button @click="deleteKategori(kat.id)" class="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors">HAPUS</button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="listKategori.length === 0">
                                <td colspan="3" class="p-6 text-center text-slate-400 font-medium">Belum ada data kategori.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-if="showModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div class="bg-white w-full max-w-md p-6 md:p-8 rounded-2xl border border-slate-200 shadow-2xl">
                    <div class="mb-6">
                        <h3 class="text-lg font-bold text-slate-900">{{ modalMode === 'add' ? 'Tambah' : 'Perbarui' }} Kategori</h3>
                        <p class="text-xs text-slate-400 mt-0.5">Masukkan nama genre atau kategori komik baru.</p>
                    </div>
                    <form @submit.prevent="saveKategori" class="space-y-4">
                        <div class="space-y-1">
                            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Kategori</label>
                            <input v-model="form.nama_kategori" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl outline-none text-sm transition-all text-slate-800" placeholder="Contoh: Shounen, Sci-Fi, Komedi" required>
                        </div>
                        <div class="flex justify-end gap-2 pt-4 border-t border-slate-100 mt-6">
                            <button @click="showModal = false" type="button" class="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">BATAL</button>
                            <button type="submit" style="background-color: #880d30;" class="px-5 py-2.5 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors opacity-90 hover:opacity-100">SIMPAN</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            listKategori: [],
            showModal: false,
            modalMode: 'add',
            form: { id: null, nama_kategori: '' }
        }
    },
    mounted() {
        this.fetchKategori();
    },
    methods: {
        async fetchKategori() {
            try {
                const res = await axios.get('http://localhost:8080/api/kategori', {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                this.listKategori = res.data;
            } catch (err) { console.error(err); }
        },
        openModal(mode, data = null) {
            this.modalMode = mode;
            this.form = data ? { ...data } : { id: null, nama_kategori: '' };
            this.showModal = true;
        },
        async saveKategori() {
            try {
                const isEdit = this.modalMode === 'edit';
                // URL disesuaikan dengan Routes.php grup 'api' yang baru dibuat
                const url = isEdit 
                    ? 'http://localhost:8080/api/kategori/update/' + this.form.id 
                    : 'http://localhost:8080/api/kategori';

                await axios.post(url, this.form, {
                    headers: { 
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json' 
                    }
                });
                this.showModal = false;
                this.fetchKategori();
            } catch (err) { alert('Gagal menyimpan kategori.'); }
        },
        async deleteKategori(id) {
            if (confirm('Yakin ingin menghapus kategori ini?')) {
                try {
                    await axios.delete('http://localhost:8080/api/kategori/' + id, {
                        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                    });
                    this.fetchKategori();
                } catch (err) { alert('Gagal menghapus kategori'); }
            }
        }
    }
}