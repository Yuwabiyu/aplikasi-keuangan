const express = require("express");
const router = express.Router();

// Login
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Simple authentication (ganti dengan database query jika diperlukan)
    if (username && password) {
        req.session.user = {
            username: username,
            id: 1
        };
        res.json({ 
            message: "Login berhasil",
            success: true
        });
    } else {
        res.status(401).json({ 
            message: "Username atau password tidak valid",
            success: false
        });
    }
});

// Logout
router.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({ 
        message: "Logout berhasil",
        success: true
    });
});

// Check session
router.get("/check", (req, res) => {
    if (req.session.user) {
        res.json({ 
            loggedIn: true,
            user: req.session.user 
        });
    } else {
        res.json({ 
            loggedIn: false 
        });
    }
});

module.exports = router;
