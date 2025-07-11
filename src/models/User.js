const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: { type: String,
     required: true, 
     unique: true },
  passwordHash: { type: String, required: true },
  profile: {
    name: String,
    avatarUrl: String
  },
  role: { type: String, 
    enum: ['free', 'premium'], 
    default: 'free' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', userSchema);