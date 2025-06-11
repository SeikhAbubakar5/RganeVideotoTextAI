const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
  youtubeVideoId: String,
  title: String,
  description: String,
  uploaderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Video', videoSchema);