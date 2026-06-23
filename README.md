# UAS WEB2

Nama: Syafira Luthfi Azzahra

Kelas: I241D

NIM: 312410353

Mata Kuliah: Pemrograman Web

# E-LIBRARY KOMIK

Aplikasi E-Library ini merupakan sistem informasi manajemen rental buku dan komik digital yang dibangun secara mandiri untuk memenuhi komponen utama penilaian Ujian Akhir Semester pada mata kuliah Pemrograman Web 2. Sistem ini dikembangkan dengan menerapkan arsitektur terpisah secara penuh antara server backend dan klien frontend. Melalui arsitektur ini, backend berfungsi murni sebagai RESTful API Server menggunakan CodeIgniter 4, sedangkan frontend mengelola seluruh antarmuka pengguna secara asinkronus sebagai Single Page Application memanfaatkan VueJS 3 dan TailwindCSS.

# DATABASE

<img width="1918" height="1001" alt="Cuplikan layar 2026-06-22 181723" src="https://github.com/user-attachments/assets/430428af-6cb5-4650-ad05-9d82b1622982" />

Gambar ini menampilkan struktur database db_elibrary pada phpMyAdmin yang terdiri dari empat tabel utama yaitu buku, kategori, peminjaman, dan users. Seluruh tabel ini dirancang saling berelasi menggunakan storage engine InnoDB untuk mendukung kebutuhan data pada Sistem Informasi Rental Buku dan Komik Digital secara terintegrasi.

# POSTMAN

<img width="1583" height="985" alt="Cuplikan layar 2026-06-22 181824" src="https://github.com/user-attachments/assets/53d0e7a2-7143-4221-87f3-80c287c2eb6a" />

Gambar ini menampilkan hasil uji coba RESTful API menggunakan Postman pada endpoint POST untuk data buku, yang menunjukkan keberhasilan implementasi Server-Side Security. Sistem terbukti aman dengan menolak akses ilegal dan mengembalikan respon HTTP 401 Unauthorized disertai pesan bahwa akses ditolak karena token tidak ditemukan, membuktikan fungsi CodeIgniter Filters berjalan baik dalam memproteksi endpoint manipulasi data.

# E-LIBRARY

## Halaman Katalog User

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/07b629a5-57f2-4a04-a8e1-d4e6e2aabff5" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2d171d9f-3225-4280-bea3-5950fffa7fc7" />

## Halaman Login

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/13b1f181-775d-4d8a-bb1a-c36d3c1e26e6" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fe4605a5-b2cd-44a6-b20b-82fc33fc91d1" />

## Halaman Dashboard Admin

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6764e67e-c0a2-4286-b943-34b5e4713904" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f7893433-dc9d-4186-925f-3b5d38ade1c3" />

## Tambah Buku

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e16efb89-008d-449c-8c8e-a02518ef2e77" />

## Edit Buku

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e02b6b63-19e0-4dcf-9f37-28b5c90e3f4a" />

## Kategori

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/02ab71a9-96f1-46d4-8fca-1555af588bce" />
