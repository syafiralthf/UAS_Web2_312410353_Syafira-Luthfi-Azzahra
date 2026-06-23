<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class KategoriController extends ResourceController
{
    // Hubungkan otomatis dengan KategoriModel yang baru saja kamu buat
    protected $modelName = 'App\Models\KategoriModel';
    protected $format    = 'json';

    /**
     * 1. Ambil Semua Kategori (GET /api/kategori)
     */
    public function index()
    {
        $data = $this->model->findAll();
        return $this->respond($data, 200);
    }

    /**
     * 2. Tambah Kategori Baru (POST /api/kategori)
     */
    public function create()
    {
        // Menangkap data JSON dari Axios frontend
        $data = $this->request->getJSON(true) ?: $this->request->getPost();
        
        if (!$data) {
            return $this->fail('Data request tidak valid.', 400);
        }

        if ($this->model->insert($data)) {
            return $this->respondCreated([
                'status'  => 201,
                'message' => 'Kategori/Genre baru berhasil ditambahkan!'
            ]);
        }
        
        return $this->fail($this->model->errors());
    }

    /**
     * 3. Ubah Kategori (POST ke /api/kategori/update/:id)
     */
    public function update($id = null)
    {
        if (!$this->model->find($id)) {
            return $this->failNotFound('Kategori tidak ditemukan.');
        }

        $data = $this->request->getJSON(true) ?: $this->request->getRawInput();

        if (empty($data)) {
            return $this->fail('Tidak ada data untuk diperbarui.', 400);
        }

        if ($this->model->update($id, $data)) {
            return $this->respond([
                'status'  => 200,
                'message' => 'Nama kategori berhasil diperbarui!'
            ]);
        }
        
        return $this->fail($this->model->errors());
    }

    /**
     * 4. Hapus Kategori (DELETE /api/kategori/:id)
     */
    public function delete($id = null)
    {
        if (!$this->model->find($id)) {
            return $this->failNotFound('Kategori tidak ditemukan.');
        }

        if ($this->model->delete($id)) {
            return $this->respondDeleted([
                'status'  => 200,
                'message' => 'Kategori berhasil dihapus!'
            ]);
        }
        
        return $this->fail('Gagal menghapus kategori.');
    }

    /**
     * Handle Preflight CORS agar tidak diblokir browser saat diakses dari Vue
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