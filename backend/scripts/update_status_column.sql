-- Script para actualizar la columna status a tipo ENUM purchase_status_enum

-- 1. Primero, cambiamos los valores existentes a 'in_process' para evitar problemas
UPDATE purchase_requests SET status = 'in_process' WHERE status IS NULL OR status NOT IN ('in_process', 'sent', 'completed', 'canceled');

-- 2. Cambiamos el tipo de la columna status al tipo ENUM
ALTER TABLE purchase_requests 
ALTER COLUMN status TYPE purchase_status_enum 
USING status::purchase_status_enum;

-- 3. Establecemos valor por defecto para nuevas filas
ALTER TABLE purchase_requests 
ALTER COLUMN status SET DEFAULT 'in_process'::purchase_status_enum;

-- 4. Hacemos la columna NOT NULL
ALTER TABLE purchase_requests 
ALTER COLUMN status SET NOT NULL;
