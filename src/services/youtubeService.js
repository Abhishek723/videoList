const axios = require('axios');

const fetchLatestVideos = async (searchQuery, apiKey) => {
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: searchQuery,
                type: 'video',
                order: 'date',
                maxResults: 5,
                key: apiKey,
            },
        });

        return response.data.items.map(item => ({
            title: item.snippet.title,
            description: item.snippet.description,
            publishingDatetime: item.snippet.publishedAt,
            thumbnails: item.snippet.thumbnails,
        }));
    } catch (error) {
        console.error('Error fetching videos:', error.message);
        throw error;
    }
};

module.exports = { fetchLatestVideos };
