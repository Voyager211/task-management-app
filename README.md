# Task Management Application

A full-stack task management application built with the MERN stack that allows users to organize projects and tasks with an intuitive Kanban-style interface.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Authentication
- **Secure Registration & Login** - Users can create accounts and authenticate securely
- **JWT-based Authentication** - Access tokens (24-hour expiry) and refresh tokens (7-day expiry)
- **Protected Routes** - Frontend and backend route protection
- **Automatic Token Refresh** - Seamless token renewal without user intervention
- **Persistent Sessions** - Users remain logged in across browser sessions

### Project Management
- **Create Projects** - Users can create multiple projects with titles and descriptions
- **Project Dashboard** - View all projects in a clean, card-based interface
- **Project Details** - Click on projects to view associated tasks
- **Real-time Statistics** - Track total projects and tasks

### Task Management
- **Kanban Board Interface** - Visual task organization with three status columns
  - **Todo** - Tasks that haven't been started
  - **In Progress** - Tasks currently being worked on
  - **Done** - Completed tasks
- **Priority Levels** - Assign priority to tasks
  - **High Priority** (Red badge)
  - **Medium Priority** (Yellow badge)
  - **Low Priority** (Green badge)
- **Task Counts** - Real-time task counters for each status column
- **Quick Task Creation** - Modal-based task creation within projects

### User Interface
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Clean Layout** - Modern, intuitive interface with smooth transitions
- **Modal Forms** - Non-intrusive project and task creation
- **Visual Feedback** - Loading states, success messages, and error handling
- **Easy Navigation** - Quick access to dashboard and project views

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **React Router DOM v6** - Client-side routing and navigation
- **Axios** - HTTP client with request/response interceptors
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with modern CSS features

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling and schema validation
- **JWT (jsonwebtoken)** - Secure token-based authentication
- **bcryptjs** - Password hashing and security
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📦 Installation

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Local Installation](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager
- **Git** (optional, for cloning)

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

### Step 2: Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install backend dependencies:
```bash
npm install
```

The backend uses the following main dependencies:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv

### Step 3: Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install frontend dependencies:
```bash
npm install
```

The frontend uses the following main dependencies:
- react
- react-dom
- react-router-dom
- axios
- vite

## 🔐 Environment Variables

### Backend Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/task-management

# JWT Secrets (Change these to secure random strings in production)
JWT_ACCESS_SECRET=dev_access_secret_change_this_12345_very_long_string
JWT_REFRESH_SECRET=dev_refresh_secret_change_this_67890_very_long_string

# Frontend URL
CLIENT_URL=http://localhost:5173
```

#### Environment Variable Descriptions:

- **PORT**: Backend server port (default: 5000)
- **NODE_ENV**: Application environment (development/production)
- **MONGO_URI**: MongoDB connection string
  - For local: `mongodb://localhost:27017/task-management`
  - For Atlas: `mongodb+srv://username:password@cluster.mongodb.net/task-management`
- **JWT_ACCESS_SECRET**: Secret key for access token generation (change in production)
- **JWT_REFRESH_SECRET**: Secret key for refresh token generation (change in production)
- **CLIENT_URL**: Frontend application URL for CORS

### Frontend Configuration

The frontend uses the backend URL defined in `src/services/api.js`:
```javascript
const API_URL = 'http://localhost:5000/api';
```

For production, update this to your deployed backend URL.

## 🚀 Running the Application

### Option 1: Run Backend and Frontend Separately

#### Start MongoDB (if running locally)
```bash
mongod
```

#### Start Backend Server
```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

#### Start Frontend Development Server
Open a new terminal:
```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

### Option 2: Using Concurrently (Optional)

You can set up a root `package.json` to run both servers simultaneously:

```json
{
  "scripts": {
    "install-backend": "cd backend && npm install",
    "install-frontend": "cd frontend && npm install",
    "install-all": "npm run install-backend && npm run install-frontend",
    "backend": "cd backend && npm run dev",
    "frontend": "cd frontend && npm run dev",
    "dev": "concurrently \"npm run backend\" \"npm run frontend\""
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}
```

Then run:
```bash
npm install
npm run dev
```

### Access the Application

1. Open your browser and navigate to `http://localhost:5173`
2. Register a new account
3. Login with your credentials
4. Start creating projects and tasks!

## 🔌 API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "jwt_refresh_token"
}

Response: 200 OK
{
  "accessToken": "new_jwt_access_token"
}
```

#### Logout User
```http
POST /api/auth/logout
Authorization: Bearer jwt_access_token

Response: 200 OK
{
  "message": "Logged out successfully"
}
```

### Project Routes (Protected)

All project routes require `Authorization: Bearer <accessToken>` header.

#### Get All Projects
```http
GET /api/projects
Authorization: Bearer jwt_access_token

Response: 200 OK
[
  {
    "_id": "project_id",
    "title": "Website Redesign",
    "description": "Redesign company website",
    "user": "user_id",
    "createdAt": "2026-01-11T08:30:00.000Z",
    "updatedAt": "2026-01-11T08:30:00.000Z"
  }
]
```

#### Create Project
```http
POST /api/projects
Authorization: Bearer jwt_access_token
Content-Type: application/json

{
  "title": "Website Redesign",
  "description": "Redesign company website"
}

Response: 201 Created
{
  "_id": "project_id",
  "title": "Website Redesign",
  "description": "Redesign company website",
  "user": "user_id",
  "createdAt": "2026-01-11T08:30:00.000Z"
}
```

#### Get Single Project
```http
GET /api/projects/:id
Authorization: Bearer jwt_access_token

Response: 200 OK
{
  "_id": "project_id",
  "title": "Website Redesign",
  "description": "Redesign company website",
  "user": "user_id"
}
```

#### Update Project
```http
PUT /api/projects/:id
Authorization: Bearer jwt_access_token
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated Description"
}

Response: 200 OK
{
  "_id": "project_id",
  "title": "Updated Title",
  "description": "Updated Description"
}
```

#### Delete Project
```http
DELETE /api/projects/:id
Authorization: Bearer jwt_access_token

Response: 200 OK
{
  "message": "Project deleted successfully"
}
```

### Task Routes (Protected)

All task routes require `Authorization: Bearer <accessToken>` header.

#### Get Task Statistics
```http
GET /api/tasks/stats
Authorization: Bearer jwt_access_token

Response: 200 OK
{
  "totalTasks": 15,
  "todoTasks": 5,
  "inProgressTasks": 7,
  "doneTasks": 3
}
```

#### Get Project Tasks
```http
GET /api/projects/:projectId/tasks
Authorization: Bearer jwt_access_token

Response: 200 OK
[
  {
    "_id": "task_id",
    "title": "Design Homepage",
    "status": "Todo",
    "priority": "High",
    "project": "project_id",
    "user": "user_id",
    "createdAt": "2026-01-11T08:35:00.000Z"
  }
]
```

#### Create Task
```http
POST /api/projects/:projectId/tasks
Authorization: Bearer jwt_access_token
Content-Type: application/json

{
  "title": "Design Homepage",
  "status": "Todo",
  "priority": "High"
}

Response: 201 Created
{
  "_id": "task_id",
  "title": "Design Homepage",
  "status": "Todo",
  "priority": "High",
  "project": "project_id",
  "user": "user_id"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer jwt_access_token
Content-Type: application/json

{
  "title": "Updated Task Title",
  "status": "In Progress",
  "priority": "Medium"
}

Response: 200 OK
{
  "_id": "task_id",
  "title": "Updated Task Title",
  "status": "In Progress",
  "priority": "Medium"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer jwt_access_token

Response: 200 OK
{
  "message": "Task deleted successfully"
}
```

## 📁 Project Structure

```
task-management-app/
├── backend/
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   ├── projectController.js   # Project CRUD operations
│   │   └── taskController.js      # Task CRUD operations
│   ├── middleware/
│   │   └── auth.js                # JWT authentication middleware
│   ├── models/
│   │   ├── User.js                # User schema and model
│   │   ├── Project.js             # Project schema and model
│   │   └── Task.js                # Task schema and model
│   ├── routes/
│   │   ├── authRoutes.js          # Authentication routes
│   │   ├── projectRoutes.js       # Project routes
│   │   └── taskRoutes.js          # Task routes
│   ├── utils/
│   │   └── tokenUtils.js          # JWT token generation/verification
│   ├── .env                       # Environment variables
│   ├── .gitignore                 # Git ignore file
│   ├── server.js                  # Express server entry point
│   └── package.json               # Backend dependencies
├── frontend/
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateProjectModal.jsx
│   │   │   ├── CreateTaskModal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── TaskCard.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx      # Main dashboard page
│   │   │   ├── Login.jsx          # Login page
│   │   │   ├── Register.jsx       # Registration page
│   │   │   └── ProjectDetails.jsx # Project details & tasks
│   │   ├── services/
│   │   │   └── api.js             # Axios instance & API calls
│   │   ├── App.css                # Global styles
│   │   ├── App.jsx                # Main app component
│   │   ├── index.css              # Base styles
│   │   └── main.jsx               # React entry point
│   ├── .gitignore                 # Git ignore file
│   ├── index.html                 # HTML template
│   ├── package.json               # Frontend dependencies
│   └── vite.config.js             # Vite configuration
├── .gitignore                     # Root git ignore
└── README.md                      # This file
```

## 🌐 Deployment

### Backend Deployment (Railway/Render)

#### Using Railway:

1. **Sign up** at [Railway.app](https://railway.app/)
2. **Create New Project** → Deploy from GitHub
3. **Add MongoDB** → Add MongoDB service to your project
4. **Set Environment Variables**:
   - `PORT` (Railway auto-sets this)
   - `MONGO_URI` (from Railway MongoDB service)
   - `JWT_ACCESS_SECRET`
   - `JWT_REFRESH_SECRET`
   - `NODE_ENV=production`
   - `CLIENT_URL` (your frontend URL)
5. **Deploy** - Railway will automatically deploy

#### Using Render:

1. **Sign up** at [Render.com](https://render.com/)
2. **New Web Service** → Connect GitHub repository
3. **Configure**:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && node server.js`
4. **Add Environment Variables** (same as above)
5. **Create MongoDB** on MongoDB Atlas and use connection string

### Frontend Deployment (Vercel/Netlify)

#### Using Vercel:

1. **Sign up** at [Vercel.com](https://vercel.com/)
2. **Import Project** → Select your GitHub repository
3. **Configure**:
   - Root Directory: `frontend`
   - Framework Preset: Vite
4. **Update API URL** in `frontend/src/services/api.js`:
   ```javascript
   const API_URL = 'https://your-backend-url.railway.app/api';
   ```
5. **Deploy**

#### Using Netlify:

1. **Sign up** at [Netlify.com](https://netlify.com/)
2. **New Site from Git** → Connect repository
3. **Build Settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
4. **Update API URL** (same as Vercel)
5. **Deploy**

### Post-Deployment Steps:

1. Update `CLIENT_URL` in backend `.env` to your deployed frontend URL
2. Update `API_URL` in frontend to your deployed backend URL
3. Set `NODE_ENV=production` in backend environment variables
4. Test authentication flow
5. Test all CRUD operations

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds for secure password storage
- **JWT Tokens** - Separate access and refresh tokens for enhanced security
- **Token Expiry** - Access tokens expire in 24 hours, refresh tokens in 7 days
- **Protected Routes** - Middleware authentication on both frontend and backend
- **CORS Configuration** - Controlled cross-origin resource sharing
- **Input Validation** - Server-side validation for all inputs
- **Error Handling** - Secure error messages without exposing sensitive data

## 🚧 Future Enhancements

- [ ] Drag-and-drop task reordering
- [ ] Team collaboration features
- [ ] Task assignment to multiple users
- [ ] Due dates and deadline reminders
- [ ] Task comments and activity logs
- [ ] File attachments for tasks
- [ ] Advanced filtering and search functionality
- [ ] Real-time updates with WebSockets
- [ ] Email notifications
- [ ] Dark mode support
- [ ] Mobile app (React Native)
- [ ] Export projects to CSV/PDF

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Fahad**  
Full-Stack Web Developer  
Location: Kochi, Kerala, India

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

**Built with ❤️ using the MERN Stack**
