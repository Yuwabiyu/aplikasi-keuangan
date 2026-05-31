const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Session Configuration
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Routes
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Serve frontend pages
app.get("/", (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, "public", "dashboard.html"));
    } else {
        res.sendFile(path.join(__dirname, "public", "login.html"));
    }
});

app.get("/products", (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, "public", "products.html"));
    } else {
        res.redirect("/");
    }
});

app.get("/profile", (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, "public", "profile.html"));
    } else {
        res.redirect("/");
    }
});

// 404 Error Handler
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>404 - Not Found</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    margin: 0;
                }
                .error-container {
                    text-align: center;
                    background: white;
                    padding: 2rem;
                    border-radius: 8px;
                }
                h1 { color: #e74c3c; margin: 0; }
                p { color: #7f8c8d; }
                a { color: #3498db; text-decoration: none; }
            </style>
        </head>
        <body>
            <div class="error-container">
                <h1>404 - Halaman Tidak Ditemukan</h1>
                <p>Maaf, halaman yang Anda cari tidak tersedia</p>
                <a href="/">← Kembali ke Beranda</a>
            </div>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`\n✅ Server berjalan di http://localhost:${PORT}`);
    console.log("Tekan CTRL+C untuk menghentikan server\n");
});