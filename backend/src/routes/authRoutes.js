const express = require('express');
const { register, login, logout, logoutFromAllDevices } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);
router.post('/logout-all', authenticateToken, logoutFromAllDevices);

module.exports = router;
