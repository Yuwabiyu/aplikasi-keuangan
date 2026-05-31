
## 📄 Backend Files Explanation

### `app.js` - Main Server File

**Fungsi Utama:**
- Inisialisasi Express application
- Setup middleware (CORS, body parser, session)
- Mount API routes
- Serve static files (HTML, CSS, JS)
- Route protection dengan session check

**Key Code Sections:**

```javascript
// Middleware setup
app.use(cors());                    // Enable cross-origin requests
app.use(express.json());            // Parse JSON request bodies
app.use(express.urlencoded());      // Parse form data
app.use(express.static());          // Serve static files

// Session configuration
app.use(session({
    secret: 'your-secret-key',      // Ganti di production!
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }       // Set true untuk HTTPS
}));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Frontend routes dengan session check
app.get("/", (req, res) => {
    if (req.session.user) {
        // Show dashboard
    } else {
        // Redirect to login
    }
});
```

**Output pada Start:**
```
✅ Server berjalan di http://localhost:3000
Database terhubung
```

---

### `db.js` - Database Connection

**Fungsi:**
- Setup MySQL connection
- Error handling
- Export connection instance

**Konfigurasi MySQL:**
```javascript
const db = mysql.createConnection({
    host: "localhost",              // MySQL server address
    user: "root",                   // MySQL username
    password: "",                   // MySQL password (kosong by default)
    database: "keuangan_db"         // Database name
});
```

**Connection Flow:**
```
db.js → Connect to MySQL
    ↓
If success → "Database terhubung"
If fail → Error message + exit
```

**Cara Menggunakan di Route:**
```javascript
const db = require("../db");

// Query example
db.query("SELECT * FROM products", (err, results) => {
    if (err) throw err;
    console.log(results);
});
```

---

### `setup-db.js` - Database Initialization

**Fungsi:**
- Create database `keuangan_db` jika belum ada
- Create table `products`
- Insert 10 sample data
- Verify setup completion

**Jalankan dengan:**
```bash
npm run setup
```

**Output:**
```
🔌 Connecting to MySQL...
✅ Connected to MySQL
📦 Creating database...
✅ Database created
📋 Creating products table...
✅ Table created
📊 Inserting sample data...
✅ Sample data inserted
✅ Total products: 10
🎉 Database setup completed!
```

---

## 🌐 API Routes

### `routes/auth.js` - Authentication Routes

**Endpoints:**

#### 1. POST `/api/auth/login`
```javascript
// Request body
{
    "username": "admin",
    "password": "123456"
}

// Response (Success)
{
    "message": "Login berhasil",
    "success": true
}

// Session created:
req.session.user = {
    username: "admin",
    id: 1
}
```

**How it works:**
```
1. Client submit form → /api/auth/login
2. Server extract username & password
3. Create session object (req.session.user)
4. Save session data (express-session middleware)
5. Return success response
6. Client redirect ke dashboard
```

#### 2. POST `/api/auth/logout`
```javascript
// Session destroyed
req.session.destroy()

// Response
{
    "message": "Logout berhasil",
    "success": true
}
```

#### 3. GET `/api/auth/check`
```javascript
// Response jika login
{
    "loggedIn": true,
    "user": {
        "username": "admin",
        "id": 1
    }
}

// Response jika belum login
{
    "loggedIn": false
}
```

---

### `routes/products.js` - Product CRUD Routes

#### 1. GET `/api/products` - Get All Products

```javascript
// SQL Query
SELECT * FROM products

// Response
[
    {
        "id": 1,
        "name": "Laptop Dell XPS 13",
        "price": 15000000,
        "stock": 5,
        "category": "Elektronik",
        "created_at": "2026-05-31T13:51:17.000Z",
        "updated_at": "2026-05-31T13:51:17.000Z"
    },
    // ... more products
]
```

#### 2. POST `/api/products` - Create Product

```javascript
// Request body
{
    "name": "Product Name",
    "price": 100000,
    "stock": 10,
    "category": "Elektronik"
}

// SQL Query
INSERT INTO products (name, price, stock, category)
VALUES (?, ?, ?, ?)

// Response
{
    "message": "Produk berhasil ditambahkan",
    "id": 11
}
```

#### 3. PUT `/api/products/:id` - Update Product

```javascript
// Request body
{
    "price": 150000,
    "stock": 20
}

// SQL Query
UPDATE products SET price = ?, stock = ?
WHERE id = ?

// Response
{
    "message": "Produk berhasil diupdate"
}
```

#### 4. DELETE `/api/products/:id` - Delete Product

```javascript
// SQL Query
DELETE FROM products WHERE id = ?

// Response
{
    "message": "Produk berhasil dihapus"
}
```

---

## 🎨 Frontend Files

### `public/css/style.css` - Global Styling

**Sections:**

1. **CSS Variables (Color Scheme)**
```css
:root {
    --primary-color: #2c3e50;       /* Dark blue */
    --secondary-color: #3498db;     /* Light blue */
    --success-color: #27ae60;       /* Green */
    --danger-color: #e74c3c;        /* Red */
    --light-bg: #ecf0f1;            /* Light gray */
}
```

2. **Components**
- `.navbar` - Navigation bar styling
- `.form-container` - Form wrapper
- `.btn, .btn-primary, .btn-danger` - Button variants
- `.table` - Table styling
- `.card` - Card component
- `.modal` - Modal dialog
- `.alert` - Alert messages

3. **Responsive Design**
```css
@media (max-width: 768px) {
    /* Mobile styles */
}
```

---

### `public/js/utils.js` - Helper Functions

**Key Functions:**

#### 1. `apiCall(endpoint, options)`
```javascript
// Wrapper untuk fetch API
async apiCall("/products", {
    method: "POST",
    body: JSON.stringify(data)
})

// Returns: JSON response
// Throws: Error jika gagal
```

#### 2. `showAlert(message, type)`
```javascript
// Show temporary alert message
showAlert("Produk berhasil ditambahkan", "success")
// Types: success, danger, warning, info
```

#### 3. `formatCurrency(amount)`
```javascript
// Format number ke format currency
formatCurrency(15000000)
// Output: "Rp 15.000.000,00"
```

#### 4. `formatDate(date)`
```javascript
// Format date ke Indonesian format
formatDate("2026-05-31")
// Output: "31 Mei 2026"
```

---

### Frontend Pages

#### `login.html` - Login Page

**Elements:**
- Login form dengan username & password field
- Submit button
- Demo credentials info
- Gradient background

**JavaScript Functionality:**
```javascript
// On form submit
1. Get username & password
2. POST to /api/auth/login
3. Show loading spinner
4. If success → redirect ke dashboard
5. If fail → show error alert
```

---

#### `dashboard.html` - Dashboard Page

**Components:**
1. **Navigation Bar** - Menu links + logout button
2. **Statistics Cards**
   - Total Produk
   - Total Nilai Stok
   - Kategori
   - Stok Rendah
3. **Recent Products Table** - 5 produk terbaru

**JavaScript Functionality:**
```javascript
// On page load
1. Fetch semua produk dari /api/products
2. Calculate statistics:
   - totalProducts = products.length
   - totalValue = sum(price * stock)
   - categories = count unique categories
   - lowStock = count products dengan stock < 10
3. Display stats di cards
4. Show recent products di table
```

---

#### `products.html` - Product Management

**Features:**
1. **Search Bar** - Filter produk by name/category
2. **Product Table** - Semua produk dengan Edit & Delete buttons
3. **Add Product Button** - Modal form untuk tambah produk
4. **Modal Form** - Edit/Add product dengan validasi

**JavaScript Functionality:**
```javascript
// On page load
1. Fetch all products
2. Display di table

// Add Product
1. Open modal form
2. Collect input (name, price, stock, category)
3. POST ke /api/products
4. Reload table

// Edit Product
1. Get product data
2. Populate modal form
3. PUT ke /api/products/:id
4. Reload table

// Delete Product
1. Confirm deletion
2. DELETE ke /api/products/:id
3. Reload table

// Search
1. Filter local array by keyword
2. Redraw table dengan filtered data
```

---

#### `profile.html` - User Profile

**Sections:**
1. **User Avatar & Name**
2. **User Information**
   - Username, Email, Role, Status
3. **Statistics**
   - Total Produk
   - Total Nilai Stok
4. **Activity Log**
5. **Action Buttons**
   - Edit Profile (placeholder)
   - Logout

**JavaScript Functionality:**
```javascript
// On page load
1. Fetch products dari /api/products
2. Calculate statistics
3. Display user profile info
4. Show activity log
```

---

## 🔄 Data Flow Examples

### Example 1: Add New Product

```
User fill form (login.html)
         ↓
Click "Tambah Produk" button
         ↓
Modal form open
         ↓
User input: name, price, stock, category
         ↓
Click "Simpan" button
         ↓
JavaScript apiCall() → POST /api/products
         ↓
Fetch backend dengan JSON body
         ↓
Express routes/products.js menerima request
         ↓
INSERT query ke MySQL
         ↓
Return response: {"message": "...", "id": 11}
         ↓
Frontend detect success
         ↓
Close modal + show alert
         ↓
Reload table dengan data baru
```

### Example 2: Update Product

```
User click "Edit" button
         ↓
Modal form pre-populate dengan product data
         ↓
User ubah price & stock
         ↓
Click "Simpan"
         ↓
JavaScript apiCall() → PUT /api/products/:id
         ↓
Fetch backend dengan JSON body {price, stock}
         ↓
Express routes/products.js handle PUT request
         ↓
UPDATE query ke MySQL WHERE id = :id
         ↓
Return response: {"message": "Produk berhasil diupdate"}
         ↓
Frontend reload table
```

---

## 📊 Database Schema Details

### Table: products

```sql
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,      -- Unique ID
    name VARCHAR(255) NOT NULL,             -- Product name
    price INT NOT NULL,                     -- Product price (dalam IDR)
    stock INT NOT NULL DEFAULT 0,           -- Stock quantity
    category VARCHAR(100) NOT NULL,         -- Category
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Created date
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Updated date
);
```

**Sample Data:**
| ID | Name | Price | Stock | Category |
|---|---|---|---|---|
| 1 | Laptop Dell XPS 13 | 15000000 | 5 | Elektronik |
| 2 | Mouse Logitech MX | 500000 | 20 | Elektronik |
| ... | ... | ... | ... | ... |

---

## 🔐 Session Management

### How Express-Session Works

```javascript
// When user login
req.session.user = {
    username: "admin",
    id: 1
}
// Session data saved di memory (atau store)

// On subsequent requests
if (req.session.user) {
    // User is logged in
} else {
    // Redirect to login
}

// When user logout
req.session.destroy()
// Session data cleared
```

### Session Cookie

```javascript
// Cookie config di app.js
cookie: {
    secure: false,    // Set true untuk HTTPS production
    httpOnly: true,   // JS cannot access cookie
    maxAge: 1000 * 60 * 60 * 24  // 24 hours
}
```

---

## ⚠️ Security Considerations

### Current Implementation (Development)

✅ **What we have:**
- Session-based authentication
- CORS protection
- Error handling

❌ **What we're missing (Production):**
- Password hashing (bcrypt)
- Input validation & sanitization
- CSRF protection
- Rate limiting
- SQL injection prevention
- XSS protection

### Recommended Improvements

```javascript
// Password hashing example
const bcrypt = require('bcrypt');

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Verify password
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
```

---

## 🚀 Performance Tips

1. **Database Queries**
   - Add indexes untuk frequently queried columns
   - Use LIMIT untuk pagination

2. **Frontend**
   - Minimize CSS/JS files
   - Use lazy loading untuk images
   - Implement debouncing untuk search

3. **API**
   - Add caching headers
   - Implement pagination
   - Compress responses

---

## 📝 Best Practices Implemented

✅ Modular code structure (separate files untuk routes)
✅ Error handling (try-catch, status codes)
✅ Responsive design (CSS Grid, Media queries)
✅ RESTful API design (proper HTTP methods)
✅ Session management (express-session)
✅ Separation of concerns (frontend/backend)
✅ Environment configuration (.env.example)

---

**Last Updated: 2026-05-31**
