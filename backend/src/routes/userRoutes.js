const express = require('express');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/admin-dashboard', authenticateToken, authorizeRole(['admin']), (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard' });
});

router.get('/contractor-dashboard', authenticateToken, authorizeRole(['contractor']), (req, res) => {
    res.json({ message: 'Welcome to the contractor dashboard' });
});

router.get('/all-users', authenticateToken, authorizeRole(['admin']), (req, res) => {
    res.json({ message: 'List of all users (admin only)' });
});

module.exports = router;
