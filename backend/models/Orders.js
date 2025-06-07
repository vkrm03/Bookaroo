const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  items: [
    {
      title: String,
      quantity: Number,
      price: Number,
      total: Number,
    }
  ],
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Order', orderSchema);
