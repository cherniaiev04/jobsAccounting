const pool = require('../config/db');

const createUser = async (username, hashedPassword, role, identification) => {
    const result = await pool.query(
        'INSERT INTO users (username, password, role, identification) VALUES ($1, $2, $3, $4) RETURNING *',
        [username, hashedPassword, role, identification]
    );
    return result.rows[0];
};

const findUserByUsername = async (username) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
};

module.exports = { createUser, findUserByUsername };
