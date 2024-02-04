const Video = require('../models/videoModel');
const youtubeService = require('../services/youtubeService');

const storeLatestVideos = async () => {
    try {
        const apiKey = process.env.YOUTUBE_API_KEY;
        const searchQuery = process.env.SEARCH_QUERY;

        const videos = await youtubeService.fetchLatestVideos(searchQuery, apiKey);

        await Video.insertMany(videos);
        console.log('Videos stored successfully.');
    } catch (error) {
        console.error('Error storing videos:', error.message);
    }
};

const getVideos = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const videos = await Video.find()
            .sort({ publishingDatetime: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const searchVideos = async (req, res) => {
    const { query } = req.query;

    try {
        const videos = await Video.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ],
        });

        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { storeLatestVideos, getVideos, searchVideos };
