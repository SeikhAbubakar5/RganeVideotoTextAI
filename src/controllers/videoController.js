const { fetchVideoMeta } = require('../services/youtube');
const { processSummary } = require('../jobs/summary');
const Video = require('../models/Video');

const submitVideo = async (req, res) => {
  const { url, description, tags } = req.body;
  const meta = await fetchVideoMeta(url);
  const video = await Video.create({
    youtubeVideoId: url,
    title: meta.title,
    description,
    uploaderId: req.user.userId,
    tags
  });
  res.json(video);
};

const getHistory = async (req, res) => {
  const videos = await Video.find({ uploaderId: req.user.userId }).sort({ createdAt: -1 });
  res.json(videos);
};

const summarizeVideo = async (req, res) => {
  const { videoId, text } = req.body;
  const summaryText = await processSummary(text, req.user.userId, videoId);
  res.json({ summary: summaryText });
};
module.exports={
    submitVideo,
    getHistory,
    summarizeVideo,
}