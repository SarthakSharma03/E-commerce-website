# 🛒 E-Commerce Website

A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). This project features a robust admin dashboard, secure user authentication, product management, shopping cart, wishlist, and payment integration.

## 🚀 Features

### 👤 User Features
- **Authentication**: Secure Login and Signup functionality.
- **Product Browsing**: View products by category, search, and filter.
- **Product Details**: Detailed product pages with images, descriptions, and ratings.
- **Shopping Cart**: Add, remove, and update quantities of items.
- **Wishlist**: Save favorite items for later.
- **Checkout**: Secure checkout process with address management.
- **Order History**: View past orders and their status.
- **Profile Management**: Update user profile and password.
- **Contact Us**: Send messages to the administration.

### 🛠️ Admin Features
- **Dashboard**: Overview of sales, orders, and product statistics.
- **Product Management**: Create, read, update, and delete (CRUD) products.
- **Image Upload**: Cloudinary integration for seamless product image hosting.
- **Order Management**: View and update order statuses.
- **Pincode Management**: Manage deliverable pincodes.

## 🏗️ Tech Stack

### Frontend
- **React**: UI library for building interactive interfaces.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router DOM**: Client-side routing.
- **Axios**: HTTP client for API requests.
- **Framer Motion**: Library for animations.
- **React Toastify**: For notification toasts.
- **React Icons**: Icon library.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM library for MongoDB.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Bcrypt**: For password hashing.
- **Multer**: Middleware for handling `multipart/form-data`.
- **Nodemailer**: For sending emails.
- **Cashfree PG**: Payment gateway integration.
- **Cloudinary**: For image storage.

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed on your machine.
- MongoDB installed locally or a MongoDB Atlas account.
- Cloudinary account for image uploads.

### 1. Clone the Repository
```bash
git clone https://github.com/SarthakSharma03/E-commerce-website
cd https://github.com/SarthakSharma03/E-commerce-website
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```



Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:
```bash

cd ../frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application should now be running at `http://localhost:5173`.

### 4 deployment link 

-Frontend - `e-commerce-website-pck9m5wbi-sarthaks-projects-b937ee77.vercel.app`
-Backend - `https://e-commerce-website-szxx.onrender.com`

## 📂 Project Structure

```
E-commerce website/
├── backend/                # Backend source code
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware (auth, upload, etc.)
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── src/                # Server entry point and scripts
│   ├── utils/              # Utility functions
│   └── validation/         # Request validation schemas
├── frontend/               # Frontend source code
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context (Auth, Cart, Wishlist)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── layout/         # Layout components
│   │   ├── pages/          # Application pages
│   │   ├── service/        # API service calls
│   │   └── utils/          # Utility functions
└── ...
```

## 🔐 Admin Credentials
(Note: These are default credentials if seeded, otherwise register a new admin)
- **Email**: `admin@example.com`
- **Password**: `Strongpassword@123`

## 🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## 📄 License
This project is licensed under the ISC License.
