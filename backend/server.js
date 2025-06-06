const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vkrmtemp@gmail.com',
    pass: 'mysp eskk wgqz dwio',
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
    <p>Hi ${order.name},</p><p>Thank you for your order. Here are the details of the order,</p>
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
  const order = req.body;

  if (!order.email || !order.phone || !order.items || !order.totalAmount) {
    return res.status(400).json({ message: 'Missing order data' });
  }

  console.log('New order received:');
  console.log(order);

  const mailOptions = {
    from: 'Bookaroo" <vkrmtemp@gmail.com>', 
    to: order.email,
    subject: 'Your Order Summary',
    html: generateOrderEmail(order),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order email sent successfully');
    res.status(200).json({ message: 'Order received and email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
