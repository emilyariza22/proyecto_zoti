-- Crear tabla de usuarios (si no existe)
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de proveedores (suppliers)
CREATE TABLE IF NOT EXISTS suppliers (
    id_supplier SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

-- Crear tabla de solicitudes de compra
CREATE TABLE IF NOT EXISTS purchase_requests (
    request_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    id_supplier INTEGER NOT NULL,
    request_code VARCHAR(20) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'en proceso',
    total_discount NUMERIC(10,2) DEFAULT 0.00,
    vat NUMERIC(10,2) DEFAULT 0.00,
    total NUMERIC(12,2) DEFAULT 0.00,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_purchase_requests_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_purchase_requests_supplier FOREIGN KEY (id_supplier) REFERENCES suppliers(id_supplier)
);

-- Insertar datos de ejemplo en usuarios
INSERT INTO users (name, email, password, role)
VALUES 
('Catalina Toro', 'catalina@zoti.com', '$2a$10$123456789012345678901uQTlwNXgRi4s2LKhFHg6TPoVCkGiG4pm', 'admin'),
('Roberto Rojas', 'roberto@zoti.com', '$2a$10$123456789012345678901uQTlwNXgRi4s2LKhFHg6TPoVCkGiG4pm', 'vendedor'),
('Karla Cruz', 'karla@zoti.com', '$2a$10$123456789012345678901uQTlwNXgRi4s2LKhFHg6TPoVCkGiG4pm', 'vendedor')
ON CONFLICT (email) DO NOTHING;

-- Insertar datos de ejemplo en proveedores
INSERT INTO suppliers (name)
VALUES 
('Apple'),
('Samsung'),
('LG'),
('Lenovo'),
('HP'),
('Asus'),
('Huawei')
ON CONFLICT DO NOTHING;

-- Insertar datos de ejemplo en solicitudes de compra
INSERT INTO purchase_requests (user_id, id_supplier, request_code, status, total_discount, vat, total)
VALUES 
(1, 1, '179601', 'cancelado', 0, 0, 9000000),
(1, 2, '187652', 'finalizado', 0, 0, 1350000),
(1, 3, '187703', 'en proceso', 0, 0, 1350990),
(2, 4, '187604', 'cancelado', 15, 0, 1019054.90),
(2, 5, '189555', 'finalizado', 0, 0, 599800),
(3, 6, '197436', 'finalizado', 20, 0, 1375599.90),
(3, 1, '197507', 'cancelado', 0, 0, 9805900)
ON CONFLICT DO NOTHING;
