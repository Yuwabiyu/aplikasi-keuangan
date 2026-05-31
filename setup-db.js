const mysql = require("mysql2");

// Connection untuk create database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

console.log("🔌 Connecting to MySQL...");

connection.connect((err) => {
    if (err) {
        console.error("❌ Connection failed:", err.message);
        process.exit(1);
    }

    console.log("✅ Connected to MySQL");

    // Create Database
    console.log("\n📦 Creating database...");
    connection.query("CREATE DATABASE IF NOT EXISTS keuangan_db", (err) => {
        if (err) {
            console.error("❌ Error creating database:", err.message);
            connection.end();
            process.exit(1);
        }
        console.log("✅ Database created");

        // Use Database
        connection.query("USE keuangan_db", (err) => {
            if (err) {
                console.error("❌ Error using database:", err.message);
                connection.end();
                process.exit(1);
            }

            // Create Products Table
            console.log("📋 Creating products table...");
            const createTableSQL = `
                CREATE TABLE IF NOT EXISTS products (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(255) NOT NULL,
                    price INT NOT NULL,
                    stock INT NOT NULL DEFAULT 0,
                    category VARCHAR(100) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `;

            connection.query(createTableSQL, (err) => {
                if (err) {
                    console.error("❌ Error creating table:", err.message);
                    connection.end();
                    process.exit(1);
                }
                console.log("✅ Table created");

                // Insert Sample Data
                console.log("📊 Inserting sample data...");
                const sampleData = [
                    ['Laptop Dell XPS 13', 15000000, 5, 'Elektronik'],
                    ['Mouse Logitech MX', 500000, 20, 'Elektronik'],
                    ['Keyboard Mechanical RGB', 1200000, 15, 'Elektronik'],
                    ['Kaos Polos Putih', 75000, 100, 'Fashion'],
                    ['Celana Jeans Pria', 250000, 50, 'Fashion'],
                    ['Sepatu Sneaker', 450000, 30, 'Fashion'],
                    ['Mie Instan Kemasan Dus', 150000, 200, 'Makanan'],
                    ['Kopi Premium Robusta', 120000, 80, 'Makanan'],
                    ['Meja Kerja Minimalis', 2500000, 8, 'Furniture'],
                    ['Kursi Gaming', 3000000, 12, 'Furniture']
                ];

                const insertSQL = "INSERT INTO products (name, price, stock, category) VALUES ?";
                connection.query(insertSQL, [sampleData], (err) => {
                    if (err && err.code !== 'ER_DUP_ENTRY') {
                        console.error("⚠️  Error inserting data:", err.message);
                    } else if (err && err.code === 'ER_DUP_ENTRY') {
                        console.log("⚠️  Sample data already exists");
                    } else {
                        console.log("✅ Sample data inserted");
                    }

                    // Show summary
                    console.log("\n📊 Verifying database...");
                    connection.query("SELECT COUNT(*) as count FROM products", (err, results) => {
                        if (err) {
                            console.error("❌ Error verifying:", err.message);
                        } else {
                            console.log(`✅ Total products: ${results[0].count}`);
                        }

                        connection.end(() => {
                            console.log("\n🎉 Database setup completed!");
                            console.log("   Run 'npm start' to start the server");
                            process.exit(0);
                        });
                    });
                });
            });
        });
    });
});
