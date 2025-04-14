const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { createUser, findUserByUsername } = require('../models/User');
const { createSession } = require('../models/UserSession');
const { deleteSessionBySessionId, deleteAllSessionsByUserId } = require('../models/UserSession');

const register = async (req, res) => {
    const { username, password, role, identification } = req.body;
    if (!['admin', 'contractor'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
    }

    try {
        const salt = parseInt(process.env.BCRYPT_SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await createUser(username, hashedPassword, role, identification);
        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { username, password, deviceInfo } = req.body;

    try {
        const user = await findUserByUsername(username);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate a unique session ID
        const sessionId = `${user.id}-${Date.now()}-${Math.random().toString(36).substring(2)}`;

        // Store session in DB
        await createSession(user.id, sessionId, deviceInfo);

        // Generate a token with session_id
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role,
                identification: user.identification,
                sessionId: sessionId
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set the token in an HttpOnly, Secure cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript access (XSS protection)
            secure: true, // Works only in HTTPS
            sameSite: 'Strict', // Protects against CSRF attacks
            maxAge: 3600000 // 1 hour
        });

        res.json({
            message: 'Login successful'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const logout = async (req, res) => {
    const { sessionId } = req.user;

    try {
        await deleteSessionBySessionId(sessionId);
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.json({ message: 'Logged out from this device' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log out' });
    }
};

// Logout from all devices
const logoutFromAllDevices = async (req, res) => {
    const userId = req.user.id;

    try {
        await deleteAllSessionsByUserId(userId);
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.json({ message: 'Logged out from all devices' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log out from all devices' });
    }
};

module.exports = { register, login, logout, logoutFromAllDevices };
