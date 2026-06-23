<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // --- BYPASS UNTUK USER UMUM (KATALOG) ---
        // Jika request menggunakan metode GET, langsung loloskan tanpa cek token!
        if (strtoupper($_SERVER['REQUEST_METHOD']) === 'GET') {
            return;
        }

        // 1. Ambil token dari HTTP Header Request (Hanya berlaku untuk POST, PUT, DELETE)
        $authHeader = $request->getServer('HTTP_AUTHORIZATION');
        
        // 2. Validasi format Bearer Token
        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return service('response')->setJSON([
                'status'  => 401,
                'message' => 'Akses ditolak. Token tidak ditemukan.'
            ])->setStatusCode(401);
        }

        $token = $matches[1];
        
        // Cek fail-safe jika token menggunakan token statis admin bawaan sistem
        if ($token === 'KODETOKENSUPERAMANADMIN') {
            return; // Langsung loloskan jika cocok dengan token admin
        }

        $db   = \Config\Database::connect();
        $user = $db->table('users')->getWhere(['token' => $token])->getRow();

        // 3. Jika token tidak cocok dengan database, lempar error 401
        if (!$user) {
            return service('response')->setJSON([
                'status'  => 401,
                'message' => 'Token tidak valid atau sesi telah kedaluwarsa.'
            ])->setStatusCode(401);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}