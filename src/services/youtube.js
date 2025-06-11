require('dotenv').config({ path: 'src/.env' });
const axios = require('axios');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const fetchVideoMeta = async (url) => {
  const videoId = extractVideoId(url);
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${YOUTUBE_API_KEY}`;

  const response = await axios.get(apiUrl);
  const video = response.data.items[0];
  return {
    title: video.snippet.title,
    description: video.snippet.description,
    tags: video.snippet.tags || [],
  };
};

function extractVideoId(url) {
  const regex = /(?:v=|\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
module.exports = { fetchVideoMeta };