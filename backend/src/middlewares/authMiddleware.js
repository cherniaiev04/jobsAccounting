const jwt = require('jsonwebtoken');
const { findSessionBySessionId } = require('../models/UserSession');

const authenticateToken = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });

        // Check if session exists
        const session = await findSessionBySessionId(decoded.sessionId);
        if (!session) {
            return res.status(403).json({ error: 'Session not found or expired' });
        }

        req.user = decoded;
        next();
    });
};

const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'You do not have permission' });
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeRole };
