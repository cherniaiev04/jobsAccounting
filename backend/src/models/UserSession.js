const pool = require('../config/db');

// Create a new session
const createSession = async (userId, sessionId, deviceInfo) => {
    await pool.query(
        'INSERT INTO user_sessions (user_id, session_id, device_info) VALUES ($1, $2, $3)',
        [userId, sessionId, deviceInfo]
    );
};

// Find session by session_id
const findSessionBySessionId = async (sessionId) => {
    const result = await pool.query('SELECT * FROM user_sessions WHERE session_id = $1', [sessionId]);
    return result.rows[0];
};

// Delete a session by session_id (for logout)
const deleteSessionBySessionId = async (sessionId) => {
    await pool.query('DELETE FROM "user_sessions" WHERE "session_id" = $1', [sessionId]);
};

// Delete all sessions for a user (e.g., logout from all devices)
const deleteAllSessionsByUserId = async (userId) => {
    await pool.query('DELETE FROM "user_sessions" WHERE "user_id" = $1', [userId]);
};

module.exports = {
    createSession,
    findSessionBySessionId,
    deleteSessionBySessionId,
    deleteAllSessionsByUserId
};
