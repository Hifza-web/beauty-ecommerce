const mongoose = require('mongoose');
const Wishlist = require('./models/Wishlist');
require('dotenv').config();

async function test() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB');
  
  // Find a wishlist that has items
  const wishlist = await Wishlist.findOne({ products: { $exists: true, $not: { $size: 0 } } });
  if (!wishlist) {
    console.log('No wishlists with products found');
    return process.exit(0);
  }
  
  const userId = wishlist.user.toString();
  const productId = wishlist.products[0].toString();
  
  console.log('Testing with userId:', userId, 'productId:', productId);
  
  const axios = require('axios');
  try {
    const res = await axios.delete('http://localhost:5000/api/wishlist/remove', {
      data: { userId, productId }
    });
    console.log('Success!', res.status);
  } catch (err) {
    console.error('Error:', err.response?.status, err.response?.data);
  }
  process.exit(0);
}
test();
