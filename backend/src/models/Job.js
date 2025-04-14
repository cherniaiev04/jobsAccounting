const pool = require('../config/db');

const getJobs = async () => {
    const result = await pool.query('SELECT * FROM "BelegPX" WHERE "Belegtyp" = $1', ['B']);
    return result.rows;
};

const getJobsByBelegnummer = async (Belegnummer) => {
    try {
        const result = await pool.query(
            'SELECT * FROM "BelegPX" WHERE "Belegnummer" = $1 AND "Belegtyp" = $2',
            [Belegnummer, 'B']
        );
        return result.rows;
    } catch (error) {
        console.error('Error fetching jobs by Belegnummer:', error);
        throw error;
    }
};

module.exports = {
    getJobs,
    getJobsByBelegnummer,
};