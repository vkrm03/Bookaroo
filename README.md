1. Bookaroo Intro

Welcome to **Bookaroo**, an interactive chatbot-powered e-commerce web app made for book lovers! Whether you're hunting for mystery novels or rom-coms, BookarooBot's got your back with AI-driven recommendations, a shopping cart, and a smooth checkout system.

> 🎯 Submission for Uplyft.ai 
> 🚀 Tech Stack: React + Flask + Express + MongoDB + OpenAI GPT

---

## 🧠 Problem Statement

To build a full-stack chatbot-integrated e-commerce platform that allows users to search, explore, and purchase products — in this case, books — through a conversational interface.

---

## ✨ Key Features

- 🤖 **AI Chatbot**: Suggests books based on user queries using OpenAI's GPT model
- 🛒 **Cart System**: Add/remove books with quantity tracking
- 📧 **Order Confirmation Email**: Sends a full summary of the order to the user
- 📋 **Admin Panel**: View all user orders
- 💬 **Chat History**: Maintains conversation context and timestamps
- 🔐 **Session Management**: Smooth interactions across components

---

## 🌐 Live Demo

👉 [https://bookaroo-store.vercel.app](https://bookaroo-store.vercel.app)

---

## 🛠️ Tech Stack

| Layer        | Tech Used                        |
|-------------|----------------------------------|
| Frontend     | React, React Router, CSS         |
| Backend API  | Node.js + Express                |
| AI Chatbot   | Python + Flask + OpenAI API      |
| Database     | MongoDB + Mongoose               |
| Mail Service | Nodemailer (Gmail SMTP)          |
| Deployment   | Vercel (Frontend), Render (APIs) |

---

2. Setup Environment Variables
Create .env files as follows:

backend/.env

MONGO_URI=your_mongo_db_uri
GMAIL_PASS=your_gmail_app_password
bot-backend/.env

OPENAI_API_KEY=your_openai_api_key


3. Run the App

Frontend
cd frontend
npm install
npm run dev

Backend API

cd ../backend
npm install
node server.js

Chatbot Server
cd ../bot-backend
pip install -r requirements.txt
python main.py


Mock Data
The app contains ~100 mock books across categories (Romance, Mystery, Sci-Fi, Thriller)

MongoDB stores all orders with user name, phone, email, cart details, and total

Sample Chat Flow
User: Recommend me some sci-fi books
Bot: Sure! Here are a few popular ones:

Dune by Frank Herbert

Ender's Game by Orson Scott Card

Neuromancer by William Gibson

The bot uses GPT-4o-mini for responses and adapts to your queries like a smart assistant.

Order Flow
User adds books to cart

Fills out name, email, phone

Clicks “Place Order”

Order is saved to MongoDB and an HTML email is sent to the user with the order summary

Admin Access
Visit /admin on the frontend to view all orders

Orders are fetched using a GET request from the backend MongoDB

Challenges Faced
Challenge	Solution
CORS issues across Flask/Express	Used CORS middleware in both backend servers
Email delivery failures	Configured Gmail SMTP + tested with app password
GPT prompt length limits	Optimized message structure with role-based context
Render deployment errors	Fixed CORS + JSON parsing issues during testing
