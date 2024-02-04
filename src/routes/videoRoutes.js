const express = require('express');
const videoController = require('../controllers/videoController');

const router = express.Router();

// Run the background task to fetch and store latest videos
setInterval(videoController.storeLatestVideos, 10 * 1000);

// Routes
router.get('/', videoController.getVideos);
router.get('/search', videoController.searchVideos);

module.exports = router;
