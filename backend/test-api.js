const axios = require('axios');

async function testApi() {
  try {
    const res = await axios.post('http://localhost:5000/api/stripe/create-checkout-session', {
      items: [
        {
          id: '123',
          name: 'Test Product',
          price: 19.99,
          quantity: 2,
          image: 'test.png'
        }
      ]
    });
    console.log("Success:", res.data);
  } catch (err) {
    if (err.response) {
      console.error("Error Status:", err.response.status);
      console.error("Error Data:", err.response.data);
    } else {
      console.error("Error:", err.message);
    }
  }
}

testApi();
