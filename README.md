# MovieVault: Movie Management App

## Deployment Link: <a href="https://movie-tracker-deployment-testing-fr.vercel.app/" target="_blank"> MovieVault </a> 🔗

The entire full stack application can be explored through the link. Feel free to test all features the app promises and share link among friends for their cinematic management experience.

## Overview

**MovieVault** is a full-stack web application designed for movie enthusiasts to manage their personal collection of films and web series. With a sleek, cinema-inspired interface, users can securely register/login, create detailed movie entries, view them in a searchable/filterable list, edit, and delete records. The app emphasizes responsive design, smooth animations, and intuitive UX, making it a delightful experience on both desktop and mobile devices.

Whether you're curating your watchlist or analyzing favorites, MovieVault turns movie management into an engaging journey. Built with modern tools for scalability and maintainability.

## Tech Stack

### Frontend
- **React** (18+): Core library for building the UI.
- **React Router**: Client-side routing for seamless navigation.
- **Axios**: HTTP client for API requests.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Framer Motion**: Animation library for smooth transitions and interactions.
- **React Icons**: Icon library (Font Awesome) for UI elements.
- **Vite**: Fast build tool and dev server.

### Backend
- **Node.js & Express.js**: Server framework for RESTful APIs.
- **Mongoose**: ODM for MongoDB schema modeling and validation.
- **bcryptjs**: Password hashing for secure authentication.
- **jsonwebtoken (JWT)**: Token-based authentication (with cookie sessions).
- **CORS**: Cross-origin resource sharing for frontend-backend communication.
- **dotenv**: Environment variable management.

### Database
- **MongoDB**: NoSQL database for flexible data storage.
- **MongoDB Atlas**: Cloud-hosted option for easy deployment.
- **MongoDB Compass**: GUI tool for data visualization and querying.

### Other Tools
- **npm/yarn**: Package managers.
- **Git/GitHub**: Version control.

## Features

### Authentication & Security
- **User Registration**: Create accounts with name, email, and password (hashed with bcrypt).
- **Secure Login/Logout**: JWT-based sessions with cookie storage for stateless auth.
- **Protected Routes**: All movie operations require authentication; redirects to login on unauthorized access.
- **Password Protection**: Strong hashing ensures secure credential storage.

### Movie Management (CRUD)
- **Create Movie**: Form to add movies with fields like title, director, budget, location, duration, year/time, genre, rating (0-10), and optional description. Real-time validation and error handling.
- **View Movies**: Responsive table (desktop) or card grid (mobile) displaying all user movies. Includes search by title/director and filter by genre.
- **Edit Movie**: Pre-filled form to update existing movies; fetches data by ID and handles optimistic updates.
- **Delete Movie**: Double-click confirmation for safety; removes from UI immediately on success.

### UI/UX Enhancements
- **Responsive Design**: Mobile-first layout with Tailwind CSS; adapts seamlessly from phones to desktops.
- **Animations**: Framer Motion for entrance effects, hover interactions, loading spinners, and staggered reveals (e.g., form fields animate in sequence).
- **Themed Interface**: Dark cinema-inspired theme with emerald accents, gradients, and backdrop blurs for a modern, immersive feel.
- **Error Handling**: Graceful 404 pages, loading states, and user-friendly error messages with animated icons.
- **Search & Filter**: Real-time filtering without page reloads; shows result counts (e.g., "Showing 5 of 12 movies").

### Performance & Accessibility
- **Fast Loading**: Vite for quick dev/build; optimized API calls with Axios interceptors.
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, and high-contrast themes.
- **Validation**: Frontend form validation + backend schema enforcement.

## Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Git (for cloning)

### Setup Instructions

1. **Clone the Repository**:
   ```
   git clone <your-repo-url>
   cd movievault
   ```

2. **Backend Setup**:
   - Navigate to backend folder:
     ```
     cd backend
     npm install
     ```
   - Copy the provided `.env` file (already in repo for reference) and update:
     ```
     PORT=8000
     MONGODB_URI=your_mongodb_connection_string_here
     JWT_SECRET=your_super_secret_jwt_key_here  # Use a strong, random string
     ```
   - For MongoDB (recommended: Atlas for ease):
     - Go to [MongoDB Atlas](https://www.mongodb.com/atlas).
     - Create a free cluster (M0 tier), select AWS Mumbai region.
     - Create a database user (e.g., username: `movieuser`, password: `securepass`).
     - Whitelist your IP (0.0.0.0/0 for dev).
     - Get connection string: `mongodb+srv://movieuser:securepass@cluster0.xxxxx.mongodb.net/movievault?retryWrites=true&w=majority`.
     - Replace in `.env` under `MONGODB_URI`.
     - Install [MongoDB Compass](https://www.mongodb.com/products/compass) for GUI visualization (connect using the same string).
   - Run backend:
     ```
     npm run dev  # Or npm start
     ```
     - Server: `http://localhost:8000`.

3. **Frontend Setup**:
   - Navigate to frontend folder:
     ```
     cd ../frontend
     npm install
     ```
   - Run frontend:
     ```
     npm run dev
     ```
     - App: `http://localhost:5173` (Vite default).

4. **Database Schema**:
   - No migrations needed (MongoDB schemaless).
   - Schemas auto-create on first use (User & Movie models in backend).
   - Seed demo data manually via Compass or backend script (see below).

## How to Use

1. **Access the App**:
   - Open `http://localhost:5173` in your browser.

2. **Login/Register**:
   - **Demo Account** (pre-seeded for quick testing):
     - Name: John Doe
     - Email: `johndoe@example.com`
     - Password: `johndoe123`
   - Or register a new account via the Register form (name, email, password).
   - After login, you're redirected to the dashboard.

3. **Dashboard**:
   - Welcome screen with navigation: "Create Movie" or "Show Movies/Web Series".

4. **Create Movie**:
   - Click "Create Movie" → Fill the form (all fields except description are required) → Submit.
   - Success: Redirects to movie list.

5. **View Movies**:
   - Click "Show Movies" → See responsive table/cards.
   - **Search**: Type in title/director field for real-time results.
   - **Filter**: Select genre from dropdown.
   - Edit: Click pencil icon → Updates form.
   - Delete: Double-click trash icon for confirmation.

6. **Edit/Delete**:
   - Edit: Pre-fills form with existing data; save changes.
   - Delete: Confirms and removes instantly.

7. **Logout**:
   - Click "Logout" from any authenticated page.

**Pro Tip**: Use MongoDB Compass to view/edit data (connect with your Atlas string). Test auth by checking `/api/get-user` in browser dev tools.

## Demo Credentials & Seeding
- **Demo User**: As above (seed if needed):
  ```javascript
  // Run in backend (node seed.js or Mongo shell)
  const bcrypt = require('bcryptjs');
  const User = require('./models/User');
  const hashed = await bcrypt.hash('johndoe123', 10);
  await User.create({ name: 'John Doe', email: 'johndoe@example.com', password: hashed });
  ```
- Add sample movies via app or Compass for testing search/filter.

## API Endpoints (for Dev/Testing)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/register` | Create user | No |
| POST | `/api/login` | Authenticate | No |
| GET | `/api/logout` | End session | Yes |
| GET | `/api/get-user` | Current user | Yes |
| POST | `/api/create-movies` | Add movie | Yes |
| GET | `/api/get-movies` | List movies | Yes |
| PUT | `/api/update-movie/:id` | Update movie | Yes |
| DELETE | `/api/delete-movies/:id` | Delete movie | Yes |
| GET | `/api/get-movie/:id` | Fetch single movie | Yes |

## Contributing
- Fork & clone.
- Install deps, run locally.
- Branch: `git checkout -b feature/your-feature`.
- Commit: `git commit -m "Add your feature"`.
- PR: Describe changes.

## License
MIT License - Free to use, modify, distribute. See [LICENSE](LICENSE) for details.

---

🎬 **MovieVault** - Where stories come alive. Built with passion for cinema! Contributions welcome.
