const express = require('express');
const router = express.Router();
const pool = require('../utils/db');
const authMiddleware = require('../middlewares/authMiddleware');

// Get all purchase requests (admins only)
router.get('/', authMiddleware.verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * 
      FROM purchase_requests
      ORDER BY created_at DESC
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching purchase requests:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get purchase request details by ID
router.get('/:id', authMiddleware.verifyAdmin, async (req, res) => {
  try {
    // Obtenemos la información de la solicitud
    const requestResult = await pool.query(`
      SELECT * 
      FROM purchase_requests
      WHERE id = $1
    `, [req.params.id]);

    if (requestResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Solicitud no encontrada' });
    }

    // Obtenemos los items de la solicitud
    const itemsResult = await pool.query(`
      SELECT pri.*, p.name as product_name, p.image as product_image
      FROM purchase_request_items pri
      LEFT JOIN products p ON pri.product_id = p.id
      WHERE pri.request_id = $1
    `, [req.params.id]);

    res.json({
      success: true,
      request: requestResult.rows[0],
      items: itemsResult.rows
    });
  } catch (error) {
    console.error('Error al obtener detalles de la solicitud:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Aprobar una solicitud de compra
router.put('/:id/approve', authMiddleware.verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      UPDATE purchase_requests
      SET status = 'approved', approved_by = $1, approved_at = NOW()
      WHERE id = $2
      RETURNING *
    `, [req.user.id, req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Solicitud no encontrada' });
    }

    // Registrar en el historial
    await pool.query(`
      INSERT INTO request_history (request_id, action, performed_by, details)
      VALUES ($1, 'approve', $2, 'Solicitud aprobada')
    `, [req.params.id, req.user.id]);

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error al aprobar la solicitud:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Rechazar una solicitud de compra
router.put('/:id/reject', authMiddleware.verifyAdmin, async (req, res) => {
  try {
    const { reason } = req.body;
    if (!reason) {
      return res.status(400).json({ success: false, message: 'El motivo de rechazo es obligatorio' });
    }

    const result = await pool.query(`
      UPDATE purchase_requests
      SET status = 'rejected', rejected_by = $1, rejected_at = NOW(), rejection_reason = $2
      WHERE id = $3
      RETURNING *
    `, [req.user.id, reason, req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Solicitud no encontrada' });
    }

    // Registrar en el historial
    await pool.query(`
      INSERT INTO request_history (request_id, action, performed_by, details)
      VALUES ($1, 'reject', $2, $3)
    `, [req.params.id, req.user.id, `Solicitud rechazada: ${reason}`]);

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error al rechazar la solicitud:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update purchase request status
router.put('/:id/status', authMiddleware.verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ success: false, message: 'El estado es requerido' });
    }
    
    // Validar que el estado sea uno de los valores permitidos del ENUM purchase_status_enum
    const allowedStatuses = ['in_process', 'sent', 'completed', 'canceled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Estado no válido. Debe ser uno de: in_process, sent, completed, canceled' 
      });
    }
    
    // Actualizar el estado en la base de datos
    const result = await pool.query(
      `UPDATE purchase_requests
       SET status = $1, updated_at = NOW()
       WHERE request_id = $2
       RETURNING *`,
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Solicitud no encontrada' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating purchase request status:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
