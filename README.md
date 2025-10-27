# Movie Management App

## Overview

Welcome to **MovieVault**, a full-stack web application for managing your favorite movies and web series. Built with a modern tech stack, it allows users to register, log in, create, view, edit, and delete movie entries with a sleek, responsive UI. The app features authentication, search/filter capabilities, and a cinema-themed design.

### Key Features
- **User Authentication**: Secure login/register with JWT/cookie-based sessions.
- **Movie CRUD**: Create, read, update, and delete movies with validation.
- **Search & Filter**: Search by title/director and filter by genre.
- **Responsive Design**: Mobile-first UI with beautiful animations using Framer Motion.
- **Real-time Feedback**: Loading states, error handling, and success messages.

### Tech Stack
- **Frontend**: React (18+), React Router, Axios, Tailwind CSS, Framer Motion, React Icons.
- **Backend**: Node.js, Express.js, Mongoose (MongoDB ODM), bcryptjs (password hashing), CORS, JSON Web Tokens (JWT).
- **Database**: MongoDB (NoSQL).
- **Other**: Vite (build tool for frontend).

## Prerequisites

Before setting up, ensure you have the following installed:
- **Node.js** (v18+): [Download here](https://nodejs.org/).
- **MongoDB**: [Install MongoDB Community Server](https://www.mongodb.com/docs/manual/installation/) or use [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud-hosted).
- **npm** or **yarn** (package managers).
- A code editor like VS Code.

## Installation & Setup

### Backend Setup
1. **Clone/Navigate to Backend Directory**:
   ```
   cd backend  # Or clone your repo
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```
   Key packages: `express`, `mongoose`, `bcryptjs`, `jsonwebtoken`, `cors`, `dotenv`.

3. **Environment Configuration**:
   - Create a `.env` file in the backend root:
     ```
     PORT=8000
     MONGODB_URI=mongodb://localhost:27017/movievault  # Or your MongoDB Atlas URI
     JWT_SECRET=your_super_secret_jwt_key_here  # Generate a strong secret
     ```
   - Replace `MONGODB_URI` with your MongoDB connection string.

4. **Database Schema**:
   - The app uses Mongoose schemas (no migrations needed for MongoDB).
   - **User Model** (`models/User.js`):
     ```javascript
     const mongoose = require('mongoose');

     const userSchema = new mongoose.Schema({
       name: { type: String, required: true },
       email: { type: String, required: true, unique: true },
       password: { type: String, required: true },
     });

     module.exports = mongoose.model('User', userSchema);
     ```
   - **Movie Model** (`models/Movie.js`):
     ```javascript
     const mongoose = require('mongoose');

     const movieSchema = new mongoose.Schema({
       title: { type: String, required: true },
       director: { type: String, required: true },
       budget: { type: Number, required: true },
       location: { type: String, required: true },
       duration: { type: String, required: true },
       yearOrTime: { type: String, required: true },
       genre: { type: String, required: true },
       rating: { type: Number, required: true },
       description: { type: String },
       user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
     });

     module.exports = mongoose.model('Movie', movieSchema);
     ```
   - Connect to MongoDB in `server.js` or `app.js`:
     ```javascript
     mongoose.connect(process.env.MONGODB_URI)
       .then(() => console.log('MongoDB connected'))
       .catch(err => console.error('MongoDB connection error:', err));
     ```

5. **Run the Backend**:
   ```
   npm start  # Or nodemon server.js for development
   ```
   - Server runs on `http://localhost:8000`.
   - Test endpoints: `/api/login`, `/api/register`, `/api/create-movies`.

### Frontend Setup
1. **Clone/Navigate to Frontend Directory**:
   ```
   cd frontend  # Or clone your repo
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```
   Key packages: `react`, `react-router-dom`, `axios`, `framer-motion`, `react-icons`, `tailwindcss`.

3. **Environment Configuration**:
   - No specific `.env` needed, but ensure API base URL is `http://localhost:8000` in Axios calls (already configured).

4. **Tailwind CSS Setup** (if not already):
   - Ensure `tailwind.config.js` includes content paths.
   - Import in `index.css`:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

5. **Run the Frontend**:
   ```
   npm run dev  # Vite dev server
   ```
   - App runs on `http://localhost:5173` (or check terminal).

### Database Setup & Migrations
- **No Formal Migrations**: MongoDB is schemaless; schemas are defined in Mongoose models (see Backend Setup above).
- **Initial Setup**:
  1. Start MongoDB: `mongod` (or use Atlas dashboard).
  2. Create database: `movievault` (auto-created on first insert).
  3. Seed Data (Optional): Run this script in MongoDB shell or Node.js:
     ```javascript
     // Seed script (run in Node.js with mongoose connected)
     const User = require('./models/User');
     const bcrypt = require('bcryptjs');

     const seedUser = async () => {
       const hashedPassword = await bcrypt.hash('password', 10);
       await new User({ name: 'Test User', email: 'test@example.com', password: hashedPassword }).save();
       console.log('Demo user created!');
     };
     seedUser();
     ```
     - **Demo Credentials**: Email: `test@example.com`, Password: `password`.

- **Indexes** (Optional for Performance):
  - Run in MongoDB shell:
    ```javascript
    db.movies.createIndex({ title: 1, genre: 1 });  // For search/filter
    db.users.createIndex({ email: 1 }, { unique: true });  // For auth
    ```

## Running the App
1. Start Backend: `npm start` in `/backend`.
2. Start Frontend: `npm run dev` in `/frontend`.
3. Open `http://localhost:5173` in browser.
4. Register/Login with demo credentials or create a new account.
5. Navigate to Create Movie → Add entries → View in Show Movies.

## API Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Register new user | No |
| POST | `/api/login` | Login user | No |
| GET | `/api/logout` | Logout user | Yes |
| GET | `/api/get-user` | Get current user | Yes |
| POST | `/api/create-movies` | Create movie | Yes |
| GET | `/api/get-movies` | Get all movies | Yes |
| PUT | `/api/update-movies/:id` | Update movie | Yes |
| DELETE | `/api/delete-movies/:id` | Delete movie | Yes |

## Troubleshooting
- **CORS Issues**: Ensure backend CORS allows `http://localhost:5173`.
- **MongoDB Connection**: Check `.env` URI and MongoDB service status.
- **Auth Errors**: Verify JWT secret and cookie settings.
- **Frontend Proxy**: If needed, add to `vite.config.js`: `server: { proxy: { '/api': 'http://localhost:8000' } }`.

## Contributing
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit changes (`git commit -m 'Add amazing feature'`).
4. Push to branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ for movie enthusiasts. Contributions welcome! 🎬*
