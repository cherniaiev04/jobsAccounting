const Job = require('../models/Job');

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.getJobs();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении работ' });
    }
};

const getJobsForOrder = async (req, res) => {
    try {
        const jobs = await Job.getJobsByBelegnummer(req.params.belegnummer);
        res.status(200).json(jobs);
    } catch (error) {
        req.status(500).json({ error: 'Ошибка при получении заказов' });
    }
};

module.exports = { getAllJobs, getJobsForOrder };