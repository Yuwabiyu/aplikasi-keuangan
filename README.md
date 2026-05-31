

### Step 1: Clone Repository & Install Dependencies
```bash
git clone <repository-url>
cd aplikasi-keuangan
npm install
```

### Step 2: Setup Database
```bash
npm run setup
```
 Script ini akan membuat database, tabel, dan sample data secara otomatis

### Step 3: Jalankan Server
```bash
npm start
```

Server akan berjalan di: **`http://localhost:3000`**


Buka browser → `http://localhost:3000`

**Demo Login:**
- Username: `admin`
- Password: `admin`

## � Sample Data


Setelah server running, buka di browser:

- **Halaman Login:** `http://localhost:3000/`
- **Dashboard:** `http://localhost:3000/` (setelah login)
- **Produk:** `http://localhost:3000/products`
- **Profile:** `http://localhost:3000/profile`

## 📡 API Endpoints

### 1. GET All Products
```bash
curl http://localhost:3000/api/products
```

**Response:** JSON array dengan semua produk

### 2. Create Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Produk Baru",
    "price": 100000,
    "stock": 10,
    "category": "Elektronik"
  }'
```

### 3. Update Product
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 150000,
    "stock": 20
  }'
```

### 4. Delete Product
```bash
curl -X DELETE http://localhost:3000/api/products/1
```



### Error: Cannot find module 'express-session'
```bash
npm install express-session
```

### Error: "Connection refused" pada database
Pastikan MySQL sudah running dan konfigurasi di `db.js` sesuai:
```javascript
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",        // Sesuaikan password
    database: "keuangan_db"
});
```


JIKA ADA TORBLE

"
git clone ...
cd aplikasi-keuangan
npm install
npm run setup
npm start

"