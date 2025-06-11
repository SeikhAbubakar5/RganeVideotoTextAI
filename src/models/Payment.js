const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({

  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' },
    
  platform: String,
  platformPaymentId: String,
  amount: Number,
  currency: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
});
module.exports = mongoose.model('Payment', paymentSchema);
