const pool = require('../config/db');

const getOrders = async () => {
    const result = await pool.query('SELECT * FROM "BelegX"');
    return result.rows;
};

const getOrdersByIdentification = async (identification) => {
    try {
        const result = await pool.query('SELECT * FROM "BelegX" WHERE "Adressnummer" = $1',
            [identification]
        );
        return result.rows;
    } catch (error) {
        console.error('Error fetching order by Identification:', error);
        throw error;
    }
};

const getOrderByBelegnummer = async (Belegnummer) => {
    try {
        const result = await pool.query(
            'SELECT * FROM "BelegX" WHERE "Belegnummer" = $1',
            [Belegnummer]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching order by Belegnummer:', error);
        throw error;
    }
};

const getAdressnummerOfOrderByBelegnummer = async (Belegnummer) => {
    try {
        const result = await pool.query(
            'SELECT "Adressnummer" FROM "BelegX" WHERE "Belegnummer" = $1',
            [Belegnummer]
        );
        return result.rows[0].Adressnummer;
    } catch (error) {
        console.error('Error fetching Adressnummer of order by Belegnummer:', error);
        throw error;
    }
}
module.exports = {
    getOrders,
    getOrderByBelegnummer,
    getOrdersByIdentification,
    getAdressnummerOfOrderByBelegnummer,
};