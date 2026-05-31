# Installation Guide

Panduan lengkap untuk instalasi dan setup Aplikasi Keuangan Sederhana.

## 📋 Prerequisites (Persyaratan)

Sebelum memulai, pastikan Anda sudah menginstall:

1. **Node.js** (v14 atau lebih tinggi)
   - Download: https://nodejs.org/
   - Verify: `node --version` dan `npm --version`

2. **MySQL** (v5.7 atau lebih tinggi)
   - Download: https://www.mysql.com/downloads/
   - Atau gunakan package manager:
     ```bash
     # macOS
     brew install mysql
     
     # Ubuntu/Debian
     sudo apt-get install mysql-server
     
     # Windows
     # Download dari official website
     ```

3. **Git** (opsional, untuk clone)
   - Download: https://git-scm.com/

---

## 🔧 Step-by-Step Installation

### Step 1: Clone atau Download Project

#### Option A: Clone dari Git
```bash
git clone <repository-url>
cd aplikasi-keuangan
```

#### Option B: Download Manual
```bash
# Download folder aplikasi-keuangan
# Buka terminal dan navigate ke folder
cd aplikasi-keuangan
```

---

### Step 2: Install Node Dependencies

```bash
npm install
```

Output yang diharapkan:
```
added XX packages in XXs
```

---

### Step 3: Setup Database MySQL

#### Option A: Menggunakan MySQL CLI (Recommended)

1. Buka terminal dan jalankan MySQL:
```bash
mysql -u root -p
# Masukkan password MySQL Anda
```

2. Jalankan setup script:
```bash
mysql -u root -p < setup.sql
```

3. Verify database dibuat:
```bash
mysql -u root -p -e "USE keuangan_db; SHOW TABLES;"
```

#### Option B: Menggunakan MySQL Workbench

1. Buka MySQL Workbench
2. Create new connection ke `localhost:3306`
3. Open file `setup.sql` di workbench
4. Execute script

#### Option C: Menggunakan phpMyAdmin

1. Buka `http://localhost/phpmyadmin`
2. Create new database: `keuangan_db`
3. Select database
4. Import file `setup.sql`

---

### Step 4: Konfigurasi Database (Jika Diperlukan)

Jika MySQL Anda menggunakan username/password yang berbeda:

1. Buka file `db.js`
2. Update konfigurasi:
```javascript
const db = mysql.createConnection({
    host: "localhost",
    user: "root",           // Ubah sesuai username MySQL Anda
    password: "password",   // Ubah sesuai password MySQL Anda
    database: "keuangan_db"
});
```

---

### Step 5: Jalankan Server

```bash
npm start
```

Output yang diharapkan:
```
✅ Server berjalan di http://localhost:3000
Tekan CTRL+C untuk menghentikan server
```

---

### Step 6: Akses Aplikasi

1. Buka browser
2. Go to: `http://localhost:3000`
3. Login dengan credentials:
   - Username: `admin` (atau apa pun)
   - Password: `123456` (atau apa pun)

---

## 🐛 Troubleshooting

### Error: "Module not found: express-session"
```bash
npm install express-session
```

### Error: "Error: connect ECONNREFUSED 127.0.0.1:3306"
**Penyebab:** MySQL tidak running

**Solusi:**
```bash
# macOS
brew services start mysql

# Ubuntu/Debian
sudo service mysql start

# Windows
# Buka Services dan cari MySQL, start service tersebut
```

### Error: "Error: Unknown database 'keuangan_db'"
**Penyebab:** Database belum dibuat

**Solusi:**
```bash
# Jalankan setup.sql
mysql -u root -p < setup.sql
```

### Error: "Access denied for user 'root'@'localhost'"
**Penyebab:** Username/password MySQL tidak sesuai

**Solusi:**
1. Verify kredensial MySQL Anda
2. Update di file `db.js`
3. Atau reset password MySQL

### Error: "Port 3000 already in use"
**Penyebab:** Port 3000 sedang digunakan aplikasi lain

**Solusi:**
```bash
# Gunakan port lain
PORT=3001 npm start

# Atau kill process yang menggunakan port 3000
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## ✅ Verifikasi Instalasi

Setelah semuanya running, verify dengan:

### 1. Check Database
```bash
mysql -u root -p -e "USE keuangan_db; SELECT * FROM products LIMIT 3;"
```

### 2. Check API dengan cURL
```bash
# Get all products
curl http://localhost:3000/api/products

# Expected output: JSON array dengan produk
```

### 3. Check Frontend
- Buka `http://localhost:3000` di browser
- Seharusnya muncul login page
- Login dan explore aplikasi

---

## 🚀 Production Setup

Untuk deploy ke production:

### 1. Install Production Dependencies
```bash
npm install --only=production
```

### 2. Update Environment Variables
Buat file `.env`:
```env
DB_HOST=your-production-db-host
DB_USER=prod-user
DB_PASSWORD=secure-password
DB_NAME=prod_keuangan_db
NODE_ENV=production
PORT=80
SESSION_SECRET=very-secure-secret-key
```

### 3. Update Database Connection
```javascript
// Di db.js
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "keuangan_db"
});
```

### 4. Gunakan Process Manager (PM2)
```bash
npm install -g pm2
pm2 start app.js --name "aplikasi-keuangan"
pm2 startup
pm2 save
```

### 5. Setup Nginx/Apache Reverse Proxy
Reverse proxy dengan SSL certificate untuk security

---

## 📚 Dokumentasi Tambahan

- [README.md](README.md) - Overview aplikasi
- [API_DOCS.md](API_DOCS.md) - API documentation
- [QUICK_START.md](QUICK_START.md) - Quick start guide
- [setup.sql](setup.sql) - Database schema dan sample data

---

## 💬 Support

Jika ada masalah:

1. Baca troubleshooting section di atas
2. Check console untuk error messages
3. Verify database connection
4. Check port availability

---

Happy Setting Up! 🎉
