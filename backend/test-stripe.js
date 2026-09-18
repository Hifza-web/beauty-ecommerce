require("dotenv").config();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function testStripe() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Test Product",
            },
            unit_amount: 1000,
          },
          quantity: 1,
        }
      ],
      mode: "payment",
      success_url: "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/checkout",
    });
    console.log("Success:", session.url);
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
  }
}

testStripe();
