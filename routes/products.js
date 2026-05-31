const express = require("express");
const router = express.Router();
const db = require("../db");


// GET /api/products
router.get("/", (req, res) => {
    const sql = "SELECT * FROM products";

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.json(result);
    });
});


// POST /api/products
router.post("/", (req, res) => {
    const { name, price, stock, category } = req.body;

    const sql =
        "INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)";

    db.query(
        sql,
        [name, price, stock, category],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(201).json({
                message: "Produk berhasil ditambahkan",
                id: result.insertId
            });
        }
    );
});


// PUT /api/products/:id
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { price, stock } = req.body;

    const sql =
        "UPDATE products SET price = ?, stock = ? WHERE id = ?";

    db.query(
        sql,
        [price, stock, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.json({
                message: "Produk berhasil diupdate"
            });
        }
    );
});


// DELETE /api/products/:id
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM products WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.json({
            message: "Produk berhasil dihapus"
        });
    });
});

module.exports = router;