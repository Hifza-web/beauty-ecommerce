const mongoose = require('mongoose');
const Wishlist = require('./models/Wishlist');
require('dotenv').config();

async function test() {
  await mongoose.connect(process.env.MONGO_URI);
  
  // Find a wishlist that has items
  const wishlist = await Wishlist.findOne();
  
  const userId = wishlist.user.toString();
  const productId = '123'; // FAKE ID
  
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
