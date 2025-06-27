# 🍽️ Recipe Reliem - Server

This is the backend server for **Recipe Reliem**, a full-featured recipe-sharing platform. It handles secure API requests, user-authenticated recipe management, and review operations using a **Node.js**, **Express**, and **MongoDB** stack with **Firebase token verification**.

---

## 🚀 Features

- ✅ RESTful API for Recipes and Reviews
- ✅ JWT-based Firebase Authentication (Admin SDK)
- ✅ Protected routes (user-only data access)
- ✅ CRUD operations for:
  - Recipes (Add, Update, Delete, Get by user/email)
  - Reviews (Add, Update, Delete, Filter)
- ✅ MongoDB Atlas for persistent cloud storage
- ✅ Cross-Origin Resource Sharing (CORS) enabled
- ✅ Clean, modular structure

---

## 🛠️ Technologies Used

| Backend | Description |
|--------|-------------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Lightweight server framework |
| **MongoDB Atlas** | Cloud database |
| **Firebase Admin SDK** | For decoding/validating JWT tokens |
| **dotenv** | Manage environment variables |
| **cors** | Enable cross-origin requests |
| **nodemon** | Dev-time auto-restart |

---

## 📂 Project Structure

📁 recipe-reliem-server
├── 📁 routes
│ ├── recipeRoutes.js
│ └── reviewRoutes.js
├── 📁 controllers
│ ├── recipeController.js
│ └── reviewController.js
├── 📁 middlewares
│ └── verifyToken.js
├── 📁 config
│ └── connectDB.js
├── .env
├── server.js
└── package.json

---

## 🔐 Authentication

All protected routes require a valid Firebase ID Token in the `Authorization` header:


Backend verifies the token using Firebase Admin SDK and decodes the user's email.

---

## 🌐 API Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/recipes` | Get all recipes |
| `POST` | `/recipes` | Add new recipe (protected) |
| `GET` | `/recipes/user/:email` | Get recipes by user |
| `PUT` | `/recipes/:id` | Update recipe |
| `DELETE` | `/recipes/:id` | Delete recipe |

| `GET` | `/reviews/:serviceId` | Get reviews for a recipe |
| `POST` | `/reviews` | Add a review |
| `PUT` | `/reviews/:id` | Update a review |
| `DELETE` | `/reviews/:id` | Delete a review |

---

## 🧪 Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/recipe-reliem-server.git
cd recipe-reliem-server
