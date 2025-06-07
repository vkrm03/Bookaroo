const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const Order = require('./models/Orders');

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vkrmtemp@gmail.com',
    pass: process.env.GMAIL_PASS,
  },
});

function generateOrderEmail(order) {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">${item.title}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align:center;">${item.quantity}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align:right;">₹${item.price}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align:right;">₹${item.total}</td>
    </tr>
  `).join('');

  return `
    <h2>Order Summary</h2>
    <p>Hi ${order.name},</p><p>Thank you for your order. Here are the details of the order:</p>
    <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Book Title</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Price per Unit</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>
    <h3>Total Amount: ₹${order.totalAmount}</h3>
    <p>We’ll contact you shortly on phone: ${order.phone}</p>
    <p>Thanks for shopping with us!</p>
  `;
}

app.post('/checkout', async (req, res) => {
  const orderData = req.body;

  if (!orderData.email || !orderData.phone || !orderData.items || !orderData.totalAmount) {
    return res.status(400).json({ message: 'Missing order data' });
  }

  try {
    const newOrder = new Order(orderData);
    await newOrder.save();
    console.log("Order saved to MongoDB");

    const mailOptions = {
      from: '"Bookaroo" <vkrmtemp@gmail.com>',
      to: orderData.email,
      subject: 'Your Order Summary',
      html: generateOrderEmail(orderData),
    };

    await transporter.sendMail(mailOptions);
    console.log('Order email sent!');

    res.status(200).json({ message: 'Order stored and email sent' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
