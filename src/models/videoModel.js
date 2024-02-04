const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    publishingDatetime: Date,
    thumbnails: [Object],
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
