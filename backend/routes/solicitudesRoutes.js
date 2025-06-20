const express = require('express');
const router = express.Router();
const pool = require('../utils/db');
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener todas las solicitudes de compra (solo admin)
router.get('/', authMiddleware.verifyAdmin, async (req, res) => {
  try {
    // Obtener todas las solicitudes con información de usuario y proveedor
    const result = await pool.query(`
      SELECT pr.*, 
             u.name as cliente, 
             s.name as vendedor,
             COALESCE(pr.total, 0) as total
      FROM purchase_requests pr
      LEFT JOIN users u ON pr.user_id = u.user_id
      LEFT JOIN suppliers s ON pr.id_supplier = s.id_supplier
      ORDER BY pr.created_at DESC
    `);
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error al obtener solicitudes de compra:', error);
    res.status(500).json({ success: false, message: 'Error al obtener solicitudes de compra', error: error.message });
  }
});

// Obtener una solicitud por ID
router.get('/:id', authMiddleware.verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM purchase_requests WHERE request_id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Solicitud no encontrada' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error al obtener solicitud:', error);
    res.status(500).json({ success: false, message: 'Error al obtener solicitud', error: error.message });
  }
});

// Crear una nueva solicitud
router.post('/', authMiddleware.verifyToken, async (req, res) => {
  try {
    const { user_id, id_supplier, request_code, status, total_discount, vat, total } = req.body;
    
    // Insertar nueva solicitud
    const result = await pool.query(`
      INSERT INTO purchase_requests 
      (user_id, id_supplier, request_code, status, total_discount, vat, total)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [user_id, id_supplier, request_code, status || 'en proceso', total_discount || 0, vat || 0, total || 0]);
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    res.status(500).json({ success: false, message: 'Error al crear solicitud', error: error.message });
  }
});

// Actualizar el estado de una solicitud
router.patch('/:id/status', authMiddleware.verifyAdmin, async (req, res) => {
  try {
    
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ success: false, message: 'Se requiere el estado (status)' });
    }
    
    const result = await pool.query('UPDATE purchase_requests SET status = $1 WHERE request_id = $2 RETURNING *', [status, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Solicitud no encontrada' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar estado', error: error.message });
  }
});

module.exports = router;
