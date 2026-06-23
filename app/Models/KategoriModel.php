<?php

namespace App\Models;

use CodeIgniter\Model;

class KategoriModel extends Model
{
    // 1. Tentukan nama tabel di database kamu
    protected $table            = 'kategori';
    
    // 2. Tentukan Primary Key dari tabel tersebut
    protected $primaryKey       = 'id';
    
    // 3. Set true jika id berbentuk angka yang auto-increment (AI)
    protected $useAutoIncrement = true;
    
    // 4. Format data yang dikembalikan berupa Array (agar mudah di-convert ke JSON)
    protected $returnType       = 'array';
    
    // 5. Kolom apa saja yang boleh diisi/dimanipulasi (SANGAT PENTING!)
    // Daftarkan nama kolom database kamu yang menyimpan nama genre/kategori
    protected $allowedFields    = ['nama_kategori']; 

    // Properti opsional di bawah ini dikosongkan/di-default saja jika tidak dipakai
    protected $useTimestamps    = false;
    protected $validationRules  = [];
    protected $validationMessages = [];
    protected $skipValidation   = false;
}