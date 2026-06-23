<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class BukuController extends ResourceController
{
    // Mengenalkan model secara otomatis ke dalam Resource Controller
    protected $modelName = 'App\Models\BukuModel';
    protected $format    = 'json';

    /**
     * 1. Ambil Semua Data Buku (READ ALL)
     * Endpoint: GET /api/buku
     */
    public function index()
    {
        // Melakukan JOIN ke tabel kategori untuk mengambil nama kategori genre buku
        $data = $this->model->select('buku.*, kategori.nama_kategori')
                            ->join('kategori', 'kategori.id = buku.kategori_id', 'left')
                            ->findAll();
                            
        return $this->respond($data, 200);
    }

    /**
     * 2. Ambil Detail Satu Data Buku (READ DETAIL)
     * Endpoint: GET /api/buku/(:num)
     */
    public function show($id = null)
    {
        $data = $this->model->find($id);
        
        if (!$data) {
            return $this->failNotFound('Data buku tidak ditemukan.');
        }
        
        return $this->respond($data, 200);
    }

    /**
     * 3. Tambah Data Buku Baru (CREATE)
     * Endpoint: POST /api/buku
     */
    public function create()
    {
        // Menangkap data JSON atau form-urlencoded dari request frontend
        $data = $this->request->getPost() ?: $this->request->getJSON(true);
        
        if (!$data) {
            return $this->fail('Data request kosong atau tidak valid.', 400);
        }

        // Proses insert data ke database
        if ($this->model->insert($data)) {
            return $this->respondCreated([
                'status'  => 201,
                'message' => 'Data komik/buku digital berhasil ditambahkan!'
            ]);
        }
        
        // Mengembalikan pesan error jika gagal validasi rules model
        return $this->fail($this->model->errors());
    }

    /**
     * 4. Ubah Data Buku (UPDATE)
     * Endpoint: PUT /api/buku/(:num)
     */
    public function update($id = null)
    {
        // Cek apakah data yang ingin diubah ada di database
        if (!$this->model->find($id)) {
            return $this->failNotFound('Data buku tidak ditemukan.');
        }

        // PERBAIKAN: Cek data input mentah dari Axios PUT request
        $data = $this->request->getRawInput();

        // Jika kosong karena axios kirim format JSON mentah, ambil menggunakan getJSON()
        if (empty($data)) {
            $data = $this->request->getJSON(true);
        }
        
        if (empty($data)) {
            return $this->fail('There is no data to update.', 400);
        }

        if ($this->model->update($id, $data)) {
            return $this->respond([
                'status'  => 200,
                'message' => 'Data komik/buku digital berhasil diperbarui!'
            ]);
        }
        
        return $this->fail($this->model->errors());
    }

    /**
     * 5. Hapus Data Buku (DELETE)
     * Endpoint: DELETE /api/buku/(:num)
     */
    public function delete($id = null)
    {
        // Cek apakah data yang ingin dihapus ada di database
        if (!$this->model->find($id)) {
            return $this->failNotFound('Data buku tidak ditemukan.');
        }

        if ($this->model->delete($id)) {
            return $this->respondDeleted([
                'status'  => 200,
                'message' => 'Data komik/buku digital berhasil dihapus!'
            ]);
        }
        
        return $this->fail('Gagal menghapus data.');
    }

    /**
     * ----------------------------------------------------------------
     * METODE BARU: MENGAMBIL DATA PEMINJAMAN UNTUK ADMIN
     * Endpoint: GET /api/peminjaman
     * ----------------------------------------------------------------
     */
    public function getPeminjaman()
    {
        $db = \Config\Database::connect();
        
        // Mengambil log peminjaman dengan data judul buku
        $data = $db->table('peminjaman')
                   ->select('peminjaman.*, buku.judul')
                   ->join('buku', 'buku.id = peminjaman.buku_id', 'left')
                   ->orderBy('tanggal_pinjam', 'DESC')
                   ->get()
                   ->getResultArray();
                    
        return $this->respond($data, 200);
    }

    /**
     * ----------------------------------------------------------------
     * METODE: TRANSAKSI PEMINJAMAN KOMIK OLEH PUBLIK
     * Endpoint: POST /api/peminjaman
     * ----------------------------------------------------------------
     */
    public function pinjam()
    {
        $db = \Config\Database::connect();
        
        $json = $this->request->getJSON();
        
        $bukuId       = $json->buku_id ?? null;
        $namaPeminjam = $json->nama_peminjam ?? 'Pembaca Umum';

        if (!$bukuId) {
            return $this->fail('ID Buku tidak boleh kosong.', 400);
        }

        $buku = $this->model->find($bukuId);

        if (!$buku || (int)$buku['stok'] <= 0) {
            return $this->fail('Maaf, stok komik ini sudah habis atau tidak ditemukan!', 400);
        }

        $db->transStart();

        $db->table('peminjaman')->insert([
            'buku_id'        => $bukuId,
            'nama_peminjam'  => $namaPeminjam,
            'tanggal_pinjam' => date('Y-m-d'),
            'status'         => 'Dipinjam'
        ]);

        $this->model->update($bukuId, [
            'stok' => (int)$buku['stok'] - 1
        ]);

        $db->transComplete();

        if ($db->transStatus() === false) {
            return $this->failServerError('Gagal memproses transaksi peminjaman pada database.');
        }

        return $this->respond([
            'status'  => 200,
            'message' => 'Peminjaman berhasil dicatat secara resmi!'
        ], 200);
    }

    /**
     * ----------------------------------------------------------------
     * METODE SELESAI: PROSES TOMBOL KEMBALIKAN DARI DASHBOARD ADMIN
     * Endpoint: PUT /api/peminjaman/(:num)
     * ----------------------------------------------------------------
     */
    public function kembalikan($id = null)
    {
        $db = \Config\Database::connect();
        
        // Cari data transaksi peminjaman berdasarkan ID lognya
        $peminjaman = $db->table('peminjaman')->where('id', $id)->get()->getRowArray();
        
        if (!$peminjaman) {
            return $this->failNotFound('Data transaksi peminjaman tidak ditemukan.');
        }
        
        if ($peminjaman['status'] === 'Dikembalikan') {
            return $this->fail('Buku ini tercatat sudah dikembalikan sebelumnya.', 400);
        }
        
        $db->transStart();
        
        // 1. Ubah status peminjaman menjadi 'Dikembalikan'
        $db->table('peminjaman')->where('id', $id)->update([
            'status' => 'Dikembalikan'
        ]);
        
        // 2. Ambil ID Buku, lalu tambahkan stoknya kembali sebanyak 1
        $bukuId = $peminjaman['buku_id'];
        $buku = $this->model->find($bukuId);
        
        if ($buku) {
            $this->model->update($bukuId, [
                'stok' => (int)$buku['stok'] + 1
            ]);
        }
        
        $db->transComplete();
        
        if ($db->transStatus() === false) {
            return $this->failServerError('Gagal memperbarui data pengembalian di database.');
        }
        
        return $this->respond([
            'status'  => 200,
            'message' => 'Buku berhasil dikembalikan dan stok database terupdate otomatis!'
        ], 200);
    }

    /**
     * ----------------------------------------------------------------
     * METODE: UTALITAS PENCEGAT PREFLIGHT CORS OPTIONS
     * ----------------------------------------------------------------
     */
    public function options()
    {
        return $this->response
            ->setHeader('Access-Control-Allow-Origin', '*')
            ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
            ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
            ->setStatusCode(200);
    }
}