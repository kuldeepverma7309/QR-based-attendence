// routes/qrCodeRoutes.js
const express = require('express');
const { generateQRCode } = require('../controllers/qrcontroller');
const { isAuthenticated } = require('../controllers/user');
const router = express.Router();



router.post('/generate-qr', isAuthenticated ,generateQRCode);


module.exports = router;
