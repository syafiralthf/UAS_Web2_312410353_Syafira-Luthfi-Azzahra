<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */

// --------------------------------------------------------------------
// GRUP RUTE API (RESTful Server untuk Decoupled Architecture)
// --------------------------------------------------------------------
$routes->group('api', function($routes) {
    
    // Endpoint Otentikasi Admin (POST & OPTIONS)
    $routes->post('auth/login', 'AuthController::login');
    $routes->post('auth/logout', 'AuthController::logout');
    $routes->options('auth/login', 'AuthController::options');

    // ----------------------------------------------------------------
    // Endpoint CRUD Buku/Komik Digital
    // ----------------------------------------------------------------
    
    // 1. TERBUKA UNTUK PUBLIK
    $routes->get('buku', 'BukuController::index');
    $routes->get('buku/(:num)', 'BukuController::show/$1');

    // 2. DIKUNCI KHUSUS ADMIN
    $routes->post('buku', 'BukuController::create');
    $routes->put('buku/(:num)', 'BukuController::update/$1');
    $routes->delete('buku/(:num)', 'BukuController::delete/$1');
    
    // 3. HANDLE CORS PREFLIGHT REQUEST BUKU
    $routes->options('buku', 'BukuController::options');
    $routes->options('buku/(:num)', 'BukuController::options');
    
    // ----------------------------------------------------------------
    // BARU: Endpoint CRUD Kategori / Genre Buku
    // ----------------------------------------------------------------
    $routes->get('kategori', 'KategoriController::index');
    $routes->post('kategori', 'KategoriController::create');
    $routes->post('kategori/update/(:num)', 'KategoriController::update/$1');
    $routes->delete('kategori/(:num)', 'KategoriController::delete/$1');
    $routes->options('kategori', 'KategoriController::options');
    $routes->options('kategori/update/(:num)', 'KategoriController::options');

    // ----------------------------------------------------------------
    // Endpoint Transaksi Peminjaman
    // ----------------------------------------------------------------
    
    // RUTE BARU: Mengambil log peminjaman untuk admin
    $routes->get('peminjaman', 'BukuController::getPeminjaman');
    
    // RUTE: Proses input pencatatan peminjaman
    $routes->post('peminjaman', 'BukuController::pinjam');
    
    // PERBAIKAN: Rute untuk memproses aksi klik tombol Kembalikan Buku
    $routes->put('peminjaman/(:num)', 'BukuController::kembalikan/$1');
    
    // OPTIONAL: Handle CORS Preflight untuk peminjaman
    $routes->options('peminjaman', 'BukuController::options');
    $routes->options('peminjaman/(:num)', 'BukuController::options');
    
});