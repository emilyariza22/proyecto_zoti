const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.registrar);
router.post('/loginti360', authController.loginti360);

module.exports = router;