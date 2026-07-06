# 🚀 Neurixa AI

Neurixa AI is a full-stack AI-powered chatbot application developed using the MERN Stack and Google's Gemini API. It enables users to interact with an intelligent AI assistant, maintain conversation history, and securely manage their accounts using JWT-based authentication.

The application supports both authenticated users and guest users. Registered users can securely log in, access personalized chat history, and continue previous conversations, while guest users can instantly use the chatbot without creating an account.

---

## 🔗 Live Demo

Frontend: https://neurixa-ai-chi.vercel.app

Backend: https://https://neurixa-ai-1.onrender.com

---

## 📸 Screenshots

### Home Page

![Home Page](./screenshots/home.png)

---

### Listing Details

![Listing Details](./screenshots/listing_details.png)

---

### Create Listing

![Create Listing](./screenshots/create_listing.png)

---

### Wishlist

![Wishlist](./screenshots/wishlist.png)

---

### Mobile View

![Mobile View](./screenshots/mobileview.jpeg)

---

### Mobile View

![Mobile View](./screenshots/mobileview2.jpeg)


---
##  Features

- 🤖 AI-powered chatbot using Google Gemini API
- 🔐 Secure User Authentication & Authorization with JWT
- 👤 Guest Mode (Use chatbot without login)
- 💬 Real-time AI conversation
- 📝 Chat history management
- 🧵 Multiple conversation threads
- 📱 Responsive and modern UI
- ⚡ Fast API communication using Axios
- 🌐 Fully deployed on Vercel and Render

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Bcrypt.js
- Cookie Parser
- CORS

### AI Integration
- Google Gemini API

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 🔒 Authentication

The application implements JWT (JSON Web Token) based authentication to ensure secure access.

- User Registration
- User Login
- Protected Routes
- Secure Password Hashing using Bcrypt
- Token-based Authentication
- Guest Mode Support

---

## 📂 Project Structure

```
Neurixa-AI/
│
├── Frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── assets/
│
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/Neurixa-AI.git
```

### Install Frontend

```bash
cd Frontend
npm install
npm run dev
```

### Install Backend

```bash
cd Backend
npm install
npm start
```

---

## 🌍 Environment Variables

### Backend

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend

```env
VITE_API_URL=http://localhost:8080/api
```

---

## 🚀 Future Enhancements

- AI conversation export
- Voice Chat
- Dark/Light Theme
- Chat Search
- Image Generation
- Forgot Password
- Email Verification
- User Profile Management

---

## 👨‍💻 Author

**Aadarsh Munna**

B.Tech CSE | NIT Agartala

GitHub: https://github.com/your-github

LinkedIn: https://linkedin.com/in/your-linkedin

---

⭐ If you found this project useful, don't forget to give it a Star!
