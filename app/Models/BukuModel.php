<?php

namespace App\Models;

use CodeIgniter\Model;

class BukuModel extends Model
{
    // Menentukan nama tabel utama di database
    protected $table            = 'buku';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    
    // Kolom-kolom yang diizinkan untuk diisi/dimanipulasi (Whitelisting)
    protected $allowedFields    = ['kategori_id', 'judul', 'penulis', 'stok', 'status_peminjaman'];

    // Aturan validasi server-side untuk memastikan kualitas data data masuk
    protected $validationRules = [
        'kategori_id' => 'required|numeric',
        'judul'       => 'required|min_length[3]|max_length[150]',
        'penulis'     => 'required|min_length[3]|max_length[100]',
        'stok'        => 'required|numeric',
    ];
}