# BE Submission REST API (Docker)

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

RESTful API yang tangguh dan ter-containerize sepenuhnya untuk operasi CRUD data buku.  
Dibangun dengan **Node.js**, **Express**, dan **MySQL**, proyek ini menggunakan **Docker Compose** untuk setup lingkungan yang terisolasi dan bebas masalah dependensi lokal.

</div>

---

##  Fitur Utama

- ✅ **Operasi CRUD Lengkap** — Tambah, Baca, Perbarui, dan Hapus data buku
- 🐳 **Infrastruktur Docker** — Setup *zero-config* untuk database dan aplikasi backend
- 🗄️ **Relational Database** — Manajemen data terstruktur menggunakan MySQL 8.0
- 🔒 **Keamanan Konfigurasi** — Menggunakan variabel lingkungan melalui file `.env`

---

## ⚙️ Persyaratan Sistem

Pastikan perangkat lunak berikut sudah terinstal sebelum memulai:

| Perangkat Lunak | Keterangan |
|---|---|
| [Git](https://git-scm.com/) | Version control |
| [Docker Desktop](https://www.docker.com/products/docker-desktop) | Pastikan Docker Engine berstatus *Running* |
| [Postman](https://www.postman.com/) / Insomnia | Untuk pengujian endpoint API |

---

## 🚀 Cara Instalasi & Menjalankan Aplikasi

### 1. Clone Repository

```bash
git clone https://github.com/RahmatHedo/nama-repo-kamu.git
```

### 2. Setup Environment

Duplikat file template dan ubah namanya menjadi `.env`:

```bash
cp .env.example .env
```

> ⚠️ **Penting:** Sebelum menjalankan aplikasi, buka file `.env` dan **isi semua nilai variabel** yang dibutuhkan terlebih dahulu.

Berikut contoh isi file `.env` yang perlu disesuaikan:

```env
# Konfigurasi Database
DB_HOST=db
DB_PORT=3306
DB_NAME=book_db
DB_USER=root
DB_PASSWORD=isi_password_kamu_di_sini

# Konfigurasi Aplikasi
APP_PORT=3000
```

### 3. Build & Jalankan Container

Nyalakan database dan aplikasi Node.js hanya dengan satu perintah:

```bash
docker-compose up -d --build
```

### 4. Verifikasi Container

Pastikan container `api_backend` dan `mysql_db` berjalan normal (Status: `Up`):

```bash
docker ps
```

Cek log backend untuk memastikan koneksi ke MySQL berhasil:

```bash
docker logs api_backend
```

---

## 📌 Referensi API Endpoints

**Base URL:** `http://localhost:3000`

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/books` | Mengambil daftar semua buku |
| `GET` | `/api/books/:id` | Mengambil detail satu buku berdasarkan ID |
| `POST` | `/api/books` | Menambahkan data buku baru |
| `PUT` | `/api/books/:id` | Memperbarui data buku yang sudah ada |
| `DELETE` | `/api/books/:id` | Menghapus data buku |

---

## 📦 Contoh Request & Response

### ➕ Tambah Buku Baru — `POST /api/books`

**Request Body (JSON):**

```json
{
  "title": "Mastering Docker & Node.js",
  "author": "Rahmat Hedo",
  "published_year": 2026
}
```

**Response (201 Created):**

```json
{
  "status": "success",
  "message": "Buku berhasil ditambahkan",
  "data": {
    "id": 1,
    "title": "Mastering Docker & Node.js",
    "author": "Rahmat Hedo",
    "published_year": 2026
  }
}
```

---

## 🗄️ Akses Langsung ke Database

Untuk melihat atau mengelola tabel langsung di dalam container MySQL:

```bash
docker exec -it db mysql -u root -prootpassword
```

Setelah masuk ke MySQL shell (`mysql>`), jalankan perintah berikut:

```sql
USE book_db;
SELECT * FROM books;
```

---

## 📸 Bukti Pengujian

Seluruh endpoint API (`POST`, `GET`, `PUT`, `DELETE`) telah diuji menggunakan **Postman**.



---

## 👤 Author

**Rahmat Hedo Alfikri**  
*Member Backend Dev — GDGoC Unsri 2026*
