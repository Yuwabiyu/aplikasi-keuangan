# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication Routes

### POST /auth/login
Login ke sistem

**Request:**
```json
{
  "username": "admin",
  "password": "123456"
}
```

**Response (Success):**
```json
{
  "message": "Login berhasil",
  "success": true
}
```

**Response (Error):**
```json
{
  "message": "Username atau password tidak valid",
  "success": false
}
```

---

### POST /auth/logout
Logout dari sistem

**Response:**
```json
{
  "message": "Logout berhasil",
  "success": true
}
```

---

### GET /auth/check
Cek status login

**Response:**
```json
{
  "loggedIn": true,
  "user": {
    "username": "admin",
    "id": 1
  }
}
```

---

## Product Routes

### GET /products
Dapatkan semua produk

**Query Parameters:**
- Tidak ada

**Response:**
```json
[
  {
    "id": 1,
    "name": "Laptop Dell XPS 13",
    "price": 15000000,
    "stock": 5,
    "category": "Elektronik",
    "created_at": "2024-05-31T10:30:00.000Z",
    "updated_at": "2024-05-31T10:30:00.000Z"
  },
  {
    "id": 2,
    "name": "Mouse Logitech MX",
    "price": 500000,
    "stock": 20,
    "category": "Elektronik",
    "created_at": "2024-05-31T10:30:00.000Z",
    "updated_at": "2024-05-31T10:30:00.000Z"
  }
]
```

---

### POST /products
Tambah produk baru

**Request Body:**
```json
{
  "name": "Produk Baru",
  "price": 100000,
  "stock": 50,
  "category": "Elektronik"
}
```

**Response (Success):**
```json
{
  "message": "Produk berhasil ditambahkan",
  "id": 11
}
```

**Response (Error):**
```json
{
  "message": "Error message here"
}
```

**HTTP Status:** 201 (Created)

---

### PUT /products/:id
Update produk (harga dan stok)

**URL Parameter:**
- `id` - ID produk yang akan diupdate

**Request Body:**
```json
{
  "price": 150000,
  "stock": 30
}
```

**Response (Success):**
```json
{
  "message": "Produk berhasil diupdate"
}
```

**Response (Error):**
```json
{
  "message": "Error message here"
}
```

---

### DELETE /products/:id
Hapus produk

**URL Parameter:**
- `id` - ID produk yang akan dihapus

**Response (Success):**
```json
{
  "message": "Produk berhasil dihapus"
}
```

**Response (Error):**
```json
{
  "message": "Error message here"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request berhasil |
| 201 | Created - Resource berhasil dibuat |
| 400 | Bad Request - Request tidak valid |
| 401 | Unauthorized - Belum login |
| 404 | Not Found - Resource tidak ditemukan |
| 500 | Internal Server Error - Error di server |

---

## Error Handling

Semua error response memiliki format:
```json
{
  "message": "Deskripsi error"
}
```

---

## Testing dengan Postman

### Untuk import ke Postman:

1. Buat New Collection: "Aplikasi Keuangan"
2. Set Base URL: `http://localhost:3000/api`
3. Buat request:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/login | Login |
| POST | /auth/logout | Logout |
| GET | /auth/check | Check login status |
| GET | /products | Get all products |
| POST | /products | Create product |
| PUT | /products/:id | Update product |
| DELETE | /products/:id | Delete product |

---

## Example Workflow

1. **Login:**
   ```
   POST /auth/login
   { "username": "admin", "password": "123456" }
   ```

2. **Get Products:**
   ```
   GET /products
   ```

3. **Add Product:**
   ```
   POST /products
   { "name": "Baru", "price": 100000, "stock": 10, "category": "Elektronik" }
   ```

4. **Update Product:**
   ```
   PUT /products/1
   { "price": 150000, "stock": 15 }
   ```

5. **Delete Product:**
   ```
   DELETE /products/1
   ```

6. **Logout:**
   ```
   POST /auth/logout
   ```

---
