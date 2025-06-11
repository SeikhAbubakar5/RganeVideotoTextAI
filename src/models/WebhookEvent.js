const mongoose = require('mongoose');
const webhookSchema = new mongoose.Schema({
  platform: String,
  eventType: String,
  payload: {},
  receivedAt: Date
});
module.exports = mongoose.model('WebhookEvent', webhookSchema);