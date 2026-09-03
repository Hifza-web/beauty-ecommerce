const mongoose = require('mongoose');
const Cart = require('./models/Cart');
require('dotenv').config();

async function test() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB');
  
  // Find a cart that has items
  const cart = await Cart.findOne({ items: { $exists: true, $not: { $size: 0 } } });
  if (!cart) {
    console.log('No carts with items found');
    return process.exit(0);
  }
  
  const userId = cart.user.toString();
  const productId = cart.items[0].product.toString();
  
  console.log('Testing cart remove with userId:', userId, 'productId:', productId);
  
  const axios = require('axios');
  try {
    const res = await axios.delete('http://localhost:5000/api/cart/remove', {
      data: { userId, productId }
    });
    console.log('Success!', res.status);
  } catch (err) {
    console.error('Error:', err.response?.status, err.response?.data);
  }
  process.exit(0);
}
test();
