const express = require('express');
const { getAllOrders, getOrderByBelegnummer } = require('../controllers/orderController');
const { getJobsForOrder } = require('../controllers/jobController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const checkOrderPermission = require('../middlewares/checkOrderPermission');

const router = express.Router();

router.get('/', authenticateToken, getAllOrders);
router.get('/:belegnummer/jobs', authenticateToken, checkOrderPermission, getJobsForOrder);
router.get('/:belegnummer', authenticateToken, checkOrderPermission, getOrderByBelegnummer);

module.exports = router;