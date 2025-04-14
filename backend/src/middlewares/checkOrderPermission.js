const pool = require('../config/db');
const { getAdressnummerOfOrderByBelegnummer } = require('../models/Order');
/**
 * Middleware to check if the user has permission to access the order.
 */
const checkOrderPermission = async (req, res, next) => {
    const { belegnummer } = req.params;
    const userIdentification = req.user.identification;

    const adressnummer = await getAdressnummerOfOrderByBelegnummer(belegnummer);
    // Check if user's identification matches the order's Adressnummer
    if (adressnummer !== userIdentification) {
        return res.status(403).json({ error: 'You have no permission' });
    }

    // User has permission
    next();

};

module.exports = checkOrderPermission;
