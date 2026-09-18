# LUMÉRA - Premium E-Commerce Platform

LUMÉRA is a full-stack, premium beauty and cosmetics e-commerce platform built with modern web technologies. It features a complete shopping experience for customers, secure authentication, a real-time admin dashboard, and seamless Stripe payment integration.

---

## 🛠 Technologies Used

**Frontend:**
- Next.js 16.3.0 (App Router)
- React 19 & TypeScript
- Tailwind CSS
- Firebase Web SDK (Client-side Notifications)
- Socket.IO-Client

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database)
- JSON Web Token (JWT)
- Socket.IO (Real-time events)
- Firebase Admin SDK (Server-side Push Notifications)
- Stripe (Payment Gateway)

---

## ✨ Features Implemented

- **Authentication:** Secure user registration, login, and profile management with JWT and password hashing (bcrypt).
- **Shopping Experience:** Dynamic product browsing, category filtering, search functionality, and detailed product pages.
- **Cart & Wishlist:** Fully synced cart and wishlist management (local storage fallback and database syncing).
- **Checkout Flow:** Integrated Stripe checkout for secure credit card payments.
- **Admin Dashboard:** Secure portal to manage products, categories, users, and orders.
- **Responsive Design:** Optimized UI/UX across mobile, tablet, and desktop devices.

---

## ⚡ Real-time Communication (Socket.IO)
LUMÉRA utilizes **Socket.IO** to maintain a persistent, bidirectional connection between the server and the admin panel. 
Whenever a customer successfully places an order, a real-time event is emitted. The admin immediately receives a custom, styled pop-up notification on their dashboard without needing to refresh the page.

---

## 🔔 Firebase Notifications
The platform implements push notifications using a dual Firebase setup:
- **Client (Firebase Web SDK):** Requests notification permissions from the user and retrieves the FCM token via a hardcoded VAPID key. 
  *(Note: The Firebase client configuration and VAPID key are safe to be public on the frontend).*
- **Server (Firebase Admin SDK):** Authenticated securely via a local Service Account JSON file. Administrators can use the backend `/api/notifications/send` endpoint to broadcast messages. 
  *(Security Note: The Service Account JSON file grants full administrative access and **MUST** be kept strictly secret and never committed to version control).*

---

## 🗄️ Database Schema (MongoDB Collections)

The database utilizes Mongoose schemas structured into the following main collections:

- **Users:** `name`, `email`, `password`, `role` (admin/user), `fcmToken`, `wishlist` (Array of Product References)
- **Products:** `name`, `price`, `description`, `image`, `category` (ObjectId), `stock`, `rating`, `reviews`, `badge`, `oldPrice`
- **Categories:** `name`, `description`, `image`
- **Orders:** `user` (ObjectId), `orderItems` (Array), `shippingAddress`, `paymentMethod`, `paymentResult`, `totalPrice`, `isPaid`, `isDelivered`
- **Newsletters:** `email`

---

## 🔌 API Documentation

Here are the key API endpoints powering the application:

### Authentication (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Authenticate user & receive JWT
- `GET /profile` - Get logged-in user's profile

### Products & Categories (`/api/products`, `/api/categories`)
- `GET /api/products` - Fetch all products
- `GET /api/products/search` - Search products by name/description
- `GET /api/products/:id` - Fetch single product details
- `POST /api/products` - Add a new product (Admin Only)
- `GET /api/categories` - Fetch all categories

### Cart, Wishlist & Orders (`/api/cart`, `/api/wishlist`, `/api/orders`)
- `POST /api/cart/add` - Add item to database cart
- `GET /api/cart/:userId` - Fetch user's cart
- `POST /api/wishlist/add` - Add product to user's wishlist
- `POST /api/orders` - Create a new order
- `GET /api/orders/myorders` - Fetch logged-in user's order history

### Stripe & Miscellaneous
- `POST /api/stripe/create-checkout-session` - Initialize Stripe payment
- `POST /api/newsletter/subscribe` - Save email to newsletter list
- `POST /api/contact` - Submit a contact us message
- `POST /api/notifications/save-token` - Save user's FCM token
- `POST /api/notifications/send` - Push notification to devices

---

## 📁 Folder Structure

```text
LUMÉRA/
├── app/                  # Next.js Frontend (App Router)
│   ├── (public pages)    # /, /shop, /contact, /deals, /[slug]
│   ├── (auth pages)      # /login, /signup, /forgot-password
│   ├── (user pages)      # /cart, /checkout, /profile, /orders, /wishlist
│   └── admin/            # Admin Dashboard
├── components/           # Reusable React UI Components (Includes CartContext, AuthContext)
├── backend/              # Node.js/Express Backend Server
│   ├── config/           # Database & Firebase Admin Configs
│   ├── middleware/       # Auth & Error Middlewares
│   ├── models/           # Mongoose Schemas
│   ├── routes/           # API Endpoints
│   └── server.js         # Entry point & Socket.IO setup
├── public/               # Static Assets & robots.txt
└── lib/                  # Utilities (api.ts, firebase.ts client config)
```

---

## ⚙️ Environment Variables

To run this project, you will need to setup the following environment variables. **Never commit actual secret values to version control.**

**Frontend** (Firebase Client config is hardcoded in `lib/firebase.ts`, API URL is inferred/configured in `api.ts`):
*No `.env` file required for local development on the frontend currently.*

**Backend** (`backend/.env`):
```env
PORT=
MONGO_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
STRIPE_SECRET_KEY=
```
*Note: Firebase Admin SDK requires a Service Account JSON file placed in `backend/config/`.*

---

## 🚀 Installation & Setup Guide

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd beauty-ecommerce
   ```

2. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

4. **Setup Environment Variables:**
   Create the `.env` file in the `backend/` directory as shown above.

5. **Run the Application:**
   Open two terminal windows:
   - Terminal 1 (Backend): `cd backend && npm run server` (or `node server.js`)
   - Terminal 2 (Frontend): `npm run dev`

---

## 🌍 Deployment Steps

1. **Database & Services Preparation:**
   - **MongoDB Atlas:** Whitelist IP `0.0.0.0/0` in your MongoDB Atlas cluster so the backend can connect globally.
   - **Stripe:** Obtain production API keys from your Stripe Dashboard.
   - **Firebase:** Generate and download a secure Service Account JSON for the backend.

2. **Backend Deployment (e.g., Render / Heroku):**
   - Push the backend code to your cloud provider.
   - Add the environment variables (`MONGO_URI`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `STRIPE_SECRET_KEY`) in the provider's dashboard.
   - Securely upload or inject the Firebase Service Account JSON file for the Admin SDK.

3. **Frontend Deployment (Vercel):**
   - Push the Next.js frontend code to a GitHub repository and connect it to Vercel.
   - Ensure the Next.js `NEXT_PUBLIC_API_URL` and `Socket.IO` connection URLs in the frontend point to the live backend URL (e.g., `https://lumera-backend.onrender.com`).
   - Deploy the Next.js application.

---

## 🛡 Production-Ready Application

The application has been refined for a production environment:
- **Security:** Private route layouts restrict unauthorized access. Passwords are cryptographically hashed using bcrypt.
- **UX/UI Polish:** Integrated loading skeletons, spinners, and toast notifications to handle API delays and provide immediate feedback.
- **Error Handling:** Robust try-catch blocks on the backend and Axios interceptors on the frontend prevent the app from crashing during failed requests.

---

## 🔎 SEO

- Added page metadata for public pages.
- Added descriptive page titles and descriptions.
- Configured `robots.txt` to control search engine crawling.
- Private pages such as admin, cart, checkout, profile, and orders are restricted from search engine indexing.
- Public product and category pages remain accessible to search engines.

---

## 🧗 Challenges Faced

- **Cart State Synchronization:** Keeping the local storage cart and the backend database cart perfectly in sync when a user logs in required careful Context API management.
- **Real-Time UI:** Implementing the Socket.IO admin notification as a centered, blurred modal without disrupting the overall layout hierarchy.
- **Data Validation:** Ensuring that out-of-stock items could not be exploited at checkout or forced into the cart via UI manipulation.

---

## 🔮 Future Enhancements

- **AI Makeup Recommendations:** Implementing an AI engine to suggest products based on user preferences.
- **Multi-language Support (i18n):** Translating the store for a broader global audience.
- **Advanced Admin Analytics:** Adding visual charts and graphs to track sales data and user growth dynamically.

---

## 🎁 Deliverables

- Fully functional, responsive Premium E-commerce Application.
- Integrated Payment Gateway (Stripe).
- Real-time Admin Dashboard.
- Complete Project & API Documentation.
