const express = require('express');
const Job = require('../models/Job');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create Job
router.post('/', authMiddleware, async (req, res) => {
    if (req.user.role !== 'employer') return res.status(403).json({ message: 'Access denied' });

    try {
        const job = new Job({ ...req.body, employer: req.user.id });
        await job.save();
        res.status(201).json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch Jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
