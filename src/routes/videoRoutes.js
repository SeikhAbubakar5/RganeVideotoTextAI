const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { submitVideo, getHistory, summarizeVideo } = require('../controllers/videoController');
const router = express.Router();

router.post('/submit', requireAuth, submitVideo);
router.get('/history', requireAuth, getHistory);
router.post('/summary', requireAuth, summarizeVideo);

module.exports = router;