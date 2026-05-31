-- Create Database
CREATE DATABASE IF NOT EXISTS keuangan_db;
USE keuangan_db;

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert Sample Data
INSERT INTO products (name, price, stock, category) VALUES
('Laptop Dell XPS 13', 150000, 5, 'Elektronik'),
('Mouse Logitech MX', 500000, 20, 'Elektronik'),
('Keyboard Mechanical RGB', 12000, 15, 'Elektronik'),
('Kaos Polos Putih', 75000, 100, 'Fashion'),
('Celana Jeans Pria', 250000, 50, 'Fashion'),
('Sepatu Sneaker', 450000, 30, 'Fashion'),
('Mie Instan Kemasan Dus', 150000, 200, 'Makanan'),
('Kopi Premium Robusta', 120000, 80, 'Makanan'),
('Meja Kerja Minimalis', 2500000, 8, 'Furniture'),
('Kursi Gaming', 30000, 12, 'Furniture');
