const Order = require('../models/Order');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.getOrdersByIdentification(req.user.identification);

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrderByBelegnummer = async (req, res) => {
    try {
        const order = await Order.getOrderByBelegnummer(req.params.belegnummer);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении заказа' });
    }
};
module.exports = { getAllOrders, getOrderByBelegnummer };