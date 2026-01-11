# API Documentation - Task Management Application

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication
This API uses JWT (JSON Web Tokens) for authentication. Most endpoints require an access token in the Authorization header.

### Token Types
- **Access Token**: Short-lived token (24 hours) used for API requests
- **Refresh Token**: Long-lived token (7 days) used to obtain new access tokens

---

## Table of Contents
1. [Authentication Endpoints (4)](#authentication-endpoints)
2. [Project Endpoints (5)](#project-endpoints)
3. [Task Endpoints (9)](#task-endpoints)

**Total: 18 Endpoints**

---

## Authentication Endpoints

### 1. Register User
Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Authentication Required:** ❌ No

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response:** `201 Created`
```json
{
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
```json
// 400 Bad Request - Missing fields
{
  "message": "Please provide all required fields"
}

// 400 Bad Request - User already exists
{
  "message": "User already exists"
}

// 400 Bad Request - Invalid email
{
  "message": "Please provide a valid email"
}
```

**Cookie Set:** ✅ Yes
- `refreshToken` (HttpOnly, 7 days expiry)

---

### 2. Login User
Authenticate existing user and receive tokens.

**Endpoint:** `POST /api/auth/login`

**Authentication Required:** ❌ No

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response:** `200 OK`
```json
{
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
```json
// 400 Bad Request - Missing credentials
{
  "message": "Please provide email and password"
}

// 401 Unauthorized - Invalid credentials
{
  "message": "Invalid email or password"
}
```

**Cookie Set:** ✅ Yes
- `refreshToken` (HttpOnly, 7 days expiry)

---

### 3. Refresh Access Token
Obtain a new access token using refresh token.

**Endpoint:** `POST /api/auth/refresh`

**Authentication Required:** ⚠️ Refresh Token Required

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Alternative:** Can also send refresh token via HttpOnly cookie

**Success Response:** `200 OK`
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
```json
// 401 Unauthorized - No refresh token
{
  "message": "Refresh token required"
}

// 401 Unauthorized - Invalid refresh token
{
  "message": "Invalid refresh token"
}

// 401 Unauthorized - Expired refresh token
{
  "message": "Refresh token expired"
}
```

**Cookie Set:** ❌ No

---

### 4. Logout User
Invalidate user session and clear tokens.

**Endpoint:** `POST /api/auth/logout`

**Authentication Required:** ✅ Yes (Access Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:** None

**Success Response:** `200 OK`
```json
{
  "message": "Logged out successfully"
}
```

**Error Responses:**
```json
// 401 Unauthorized - No token
{
  "message": "No token provided"
}

// 401 Unauthorized - Invalid token
{
  "message": "Invalid token"
}
```

**Cookie Cleared:** ✅ Yes
- `refreshToken` cookie is removed

---

## Project Endpoints

All project endpoints require authentication via access token.

### 5. Get All Projects
Retrieve all projects for the authenticated user.

**Endpoint:** `GET /api/projects`

**Authentication Required:** ✅ Yes (Access Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:** None

**Success Response:** `200 OK`
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Website Redesign",
    "description": "Redesign company website with modern UI/UX",
    "user": "65a1b2c3d4e5f6g7h8i9j0k0",
    "createdAt": "2026-01-11T08:30:00.000Z",
    "updatedAt": "2026-01-11T08:30:00.000Z"
  },
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "title": "Mobile App Development",
    "description": "Build React Native mobile application",
    "user": "65a1b2c3d4e5f6g7h8i9j0k0",
    "createdAt": "2026-01-11T09:00:00.000Z",
    "updatedAt": "2026-01-11T09:00:00.000Z"
  }
]
```

**Error Responses:**
```json
// 401 Unauthorized - No token
{
  "message": "No token provided"
}

// 401 Unauthorized - Invalid token
{
  "message": "Invalid token"
}
```

**Cookie Required:** ❌ No

---

### 6. Create Project
Create a new project for the authenticated user.

**Endpoint:** `POST /api/projects`

**Authentication Required:** ✅ Yes (Access Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Website Redesign",
  "description": "Redesign company website with modern UI/UX"
}
```

**Success Response:** `201 Created`
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "title": "Website Redesign",
  "description": "Redesign company website with modern UI/UX",
  "user": "65a1b2c3d4e5f6g7h8i9j0k0",
  "createdAt": "2026-01-11T08:30:00.000Z",
  "updatedAt": "2026-01-11T08:30:00.000Z"
}
```

**Error Responses:**
```json
// 400 Bad Request - Missing title
{
  "message": "Title is required"
}

// 401 Unauthorized - No token
{
  "message": "No token provided"
}
```

**Cookie Required:** ❌ No

---

### 7. Get Single Project
Retrieve details of a specific project.

**Endpoint:** `GET /api/projects/:id`

**Authentication Required:** ✅ Yes (Access Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**URL Parameters:**
- `id` (string, required) - Project ID

**Request Body:** None

**Success Response:** `200 OK`
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "title": "Website Redesign",
  "description": "Redesign company website with modern UI/UX",
  "user": "65a1b2c3d4e5f6g7h8i9j0k0",
  "createdAt": "2026-01-11T08:30:00.000Z",
  "updatedAt": "2026-01-11T08:30:00.000Z"
}
```

**Error Responses:**
```json
// 404 Not Found - Project doesn't exist
{
  "message": "Project not found"
}

// 403 Forbidden - Not authorized to view this project
{
  "message": "Not authorized to access this project"
}

// 401 Unauthorized - No token
{
  "message": "No token provided"
}
```

**Cookie Required:** ❌ No

---

### 8. Update Project
Update an existing project.

**Endpoint:** `PUT /api/projects/:id`

**Authentication Required:** ✅ Yes (Access Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**URL Parameters:**
- `id` (string, required) - Project ID

**Request Body:**
```json
{
  "title": "Website Redesign - Updated",
  "description": "Updated description with new requirements"
}
```

**Success Response:** `200 OK`
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "title": "Website Redesign - Updated",
  "description": "Updated description with new requirements",
  "user": "65a1b2c3d4e5f6g7h8i9j0k0",
  "createdAt": "2026-01-11T08:30:00.000Z",
  "updatedAt": "2026-01-11T09:15:00.000Z"
}
```

**Error Responses:**
```json
// 404 Not Found - Project doesn't exist
{
  "message": "Project not found"
}

// 403 Forbidden - Not authorized to update
{
  "message": "Not authorized to update this project"
}

// 401 Unauthorized - No token
{
  "message": "No token provided"
}
```

**Cookie Required:** ❌ No

---

### 9. Delete Project
Delete a project and all associated tasks.

**Endpoint:** `DELETE /api/projects/:id`

**Authentication Required:** ✅ Yes (Access Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**URL Parameters:**
- `id` (string, required) - Project ID

**Request Body:** None

**Success Response:** `200 OK`
```json
{
  "message": "Project deleted successfully"
}
```

**Error Responses:**
```json
// 404 Not Found - Project doesn't exist
{
  "message": "Project not found"
}

// 403 Forbidden - Not authorized to delete
{
  "message": "Not authorized to delete this project"
}

// 401 Unauthorized - No token
{
  "message": "No token provided"
}
```

**Cookie Required:** ❌ No

**Note:** Deleting a project will also delete all associated tasks.

---

## Task Endpoints

All task endpoints require authentication via access token.

### 10. Get Task Statistics
Retrieve task counts by status for the authenticated user.

**Endpoint:** `GET /api/tasks/stats`

**Authentication Required:** ✅ Yes (Access Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:** None

**Success Response:** `200 OK`
```json
{
  "totalTasks": 15,
  "todoTasks": 5,
  "inProgressTasks": 7,
  "doneTasks": 3
}
```

**Error Responses:**
```json
// 401 Unauthorized - No token
{
  "message": "No token provided"
}

// 401 Unauthorized - Invalid token
{
  "message": "Invalid token"
}
```

**Cookie Required:** ❌ No

---

### 11. Get All Tasks for Project
Retrieve all tasks for a specific project.

**Endpoint:** `GET /api/projects/:projectId/tasks`

**Authentication Required:** ✅ Yes (Access Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**URL Parameters:**
- `projectId` (string, required) - Project ID

**Request Body:** None

**Success Response:** `200 OK`
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "title": "Design Homepage",
    "status": "Todo",
    "priority": "High",
    "project": "65a1b2c3d4e5f6g7h8i9j0k1",
    "user": "65a1b2c3d4e5f6g7h8i9j0k0",
    "createdAt": "2026-01-11T08:35:00.000Z",
    "updatedAt": "2026-01-11T08:35:00.000Z"
  },
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
    "title": "Setup Database",
    "status": "In Progress",
    "priority": "Medium",
    "project": "65a1b2c3d4e5f6g7h8i9j0k1",
    "user": "65a1b2c3d4e5f6g7h8i9j0k0",
    "createdAt": "2026-01-11T08:36:00.000Z",
    "updatedAt": "2026-01-11T08:36:00.000Z"
  }
]
```

**Error Responses:**
```json
// 404 Not Found - Project doesn't exist
{
  "message": "Project not found"
}

// 403 Forbidden - Not authorized to view tasks
{
  "message": "Not authorized to access this project"
}

// 401 Unauthorized - No token
{
  "message": "No token provided"
}
```

**Cookie Required:** ❌ No

---

### 12. Create Task
Create a new task in a specific project.

**Endpoint:** `POST /api/projects/:projectId/tasks`

**Authentication Required:** ✅ Yes (Access Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**URL Parameters:**
- `projectId` (string, required) - Project ID

**Request Body:**
```json
{
  "title": "Design Homepage",
  "status": "Todo",
  "priority": "High"
}
```

**Field Specifications:**
- `title` (string, required) - Task title
- `status` (string, required) - One of: "Todo", "In Progress", "Done"
- `priority` (string, required) - One of: "Low", "Medium", "High"

**Success Response:** `201 Created`
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
  "title": "Design Homepage",
  "status": "Todo",
  "priority": "High",
  "project": "65a1b2c3d4e5f6g7h8i9j0k1",
  "user": "65a1b2c3d4e5f6g7h8i9j0k0",
  "createdAt": "2026-01-11T08:35:00.000Z",
  "updatedAt": "2026-01-11T08:35:00.000Z"
}
```

**Error Responses:**
```json
// 400 Bad Request - Missing required fields
{
  "message": "Title, status, and priority are required"
}

// 400 Bad Request - Invalid status
{
  "message": "Status must be one of: Todo, In Progress, Done"
}

// 400 Bad Request - Invalid priority
{
  "message": "Priority must be one of: Low, Medium, High"
}

// 404 Not Found - Project doesn't exist
{
  "message": "Project not found"
}

// 403 Forbidden - Not authorized
{
  "message": "Not authorized to create tasks in this project"
}
```

**Cookie Required:** ❌ No

---

### 13. Get Single Task
Retrieve details of a specific task.

**Endpoint:** `GET /api/tasks/:id`

**Authentication Required:** ✅ Yes (Access Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**URL Parameters:**
- `id` (string, required) - Task ID

**Request Body:** None

**Success Response:** `200 OK`
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
  "title": "Design Homepage",
  "status": "Todo",
  "priority": "High",
  "project": "65a1b2c3d4e5f6g7h8i9j0k1",
  "user": "65a1b2c3d4e5f6g7h8i9j0k0",
  "createdAt": "2026-01-11T08:35:00.000Z",
  "updatedAt": "2026-01-11T08:35:00.000Z"
}
```

**Error Responses:**
```json
// 404 Not Found - Task doesn't exist
{
  "message": "Task not found"
}

// 403 Forbidden - Not authorized
{
  "message": "Not authorized to access this task"
}

// 401 Unauthorized - No token
{
  "message": "No token provided"
}
```

**Cookie Required:** ❌ No

---

### 14. Update Task
Update an existing task.

**Endpoint:** `PUT /api/tasks/:id`

**Authentication Required:** ✅ Yes (Access Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**URL Parameters:**
- `id` (string, required) - Task ID

**Request Body:**
```json
{
  "title": "Design Homepage - Updated",
  "status": "In Progress",
  "priority": "High"
}
```

**Note:** All fields are optional. Only include fields you want to update.

**Success Response:** `200 OK`
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
  "title": "Design Homepage - Updated",
  "status": "In Progress",
  "priority": "High",
  "project": "65a1b2c3d4e5f6g7h8i9j0k1",
  "user": "65a1b2c3d4e5f6g7h8i9j0k0",
  "createdAt": "2026-01-11T08:35:00.000Z",
  "updatedAt": "2026-01-11T09:20:00.000Z"
}
```

**Error Responses:**
```json
// 400 Bad Request - Invalid status
{
  "message": "Status must be one of: Todo, In Progress, Done"
}

// 400 Bad Request - Invalid priority
{
  "message": "Priority must be one of: Low, Medium, High"
}

// 404 Not Found - Task doesn't exist
{
  "message": "Task not found"
}

// 403 Forbidden - Not authorized
{
  "message": "Not authorized to update this task"
}
```

**Cookie Required:** ❌ No

---

### 15. Delete Task
Delete a specific task.

**Endpoint:** `DELETE /api/tasks/:id`

**Authentication Required:** ✅ Yes (Access Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**URL Parameters:**
- `id` (string, required) - Task ID

**Request Body:** None

**Success Response:** `200 OK`
```json
{
  "message": "Task deleted successfully"
}
```

**Error Responses:**
```json
// 404 Not Found - Task doesn't exist
{
  "message": "Task not found"
}

// 403 Forbidden - Not authorized
{
  "message": "Not authorized to delete this task"
}

// 401 Unauthorized - No token
{
  "message": "No token provided"
}
```

**Cookie Required:** ❌ No

---

### 16. Get All Tasks (All Projects)
Retrieve all tasks across all projects for the authenticated user.

**Endpoint:** `GET /api/tasks`

**Authentication Required:** ✅ Yes (Access Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:** None

**Success Response:** `200 OK`
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "title": "Design Homepage",
    "status": "Todo",
    "priority": "High",
    "project": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "title": "Website Redesign"
    },
    "user": "65a1b2c3d4e5f6g7h8i9j0k0",
    "createdAt": "2026-01-11T08:35:00.000Z"
  },
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
    "title": "Setup Database",
    "status": "In Progress",
    "priority": "Medium",
    "project": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "title": "Mobile App Development"
    },
    "user": "65a1b2c3d4e5f6g7h8i9j0k0",
    "createdAt": "2026-01-11T08:36:00.000Z"
  }
]
```

**Error Responses:**
```json
// 401 Unauthorized - No token
{
  "message": "No token provided"
}
```

**Cookie Required:** ❌ No

---

### 17. Get Tasks by Status
Filter tasks by status across all projects.

**Endpoint:** `GET /api/tasks/status/:status`

**Authentication Required:** ✅ Yes (Access Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**URL Parameters:**
- `status` (string, required) - One of: "Todo", "In Progress", "Done"

**Request Body:** None

**Success Response:** `200 OK`
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "title": "Design Homepage",
    "status": "Todo",
    "priority": "High",
    "project": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "title": "Website Redesign"
    },
    "user": "65a1b2c3d4e5f6g7h8i9j0k0",
    "createdAt": "2026-01-11T08:35:00.000Z"
  }
]
```

**Error Responses:**
```json
// 400 Bad Request - Invalid status
{
  "message": "Status must be one of: Todo, In Progress, Done"
}

// 401 Unauthorized - No token
{
  "message": "No token provided"
}
```

**Cookie Required:** ❌ No

---

### 18. Get Tasks by Priority
Filter tasks by priority across all projects.

**Endpoint:** `GET /api/tasks/priority/:priority`

**Authentication Required:** ✅ Yes (Access Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**URL Parameters:**
- `priority` (string, required) - One of: "Low", "Medium", "High"

**Request Body:** None

**Success Response:** `200 OK`
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "title": "Design Homepage",
    "status": "Todo",
    "priority": "High",
    "project": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "title": "Website Redesign"
    },
    "user": "65a1b2c3d4e5f6g7h8i9j0k0",
    "createdAt": "2026-01-11T08:35:00.000Z"
  }
]
```

**Error Responses:**
```json
// 400 Bad Request - Invalid priority
{
  "message": "Priority must be one of: Low, Medium, High"
}

// 401 Unauthorized - No token
{
  "message": "No token provided"
}
```

**Cookie Required:** ❌ No

---

## Common Error Responses

### 401 Unauthorized
Occurs when authentication fails or token is invalid/expired.

```json
{
  "message": "No token provided"
}
```

```json
{
  "message": "Invalid token"
}
```

```json
{
  "message": "Token expired"
}
```

### 403 Forbidden
Occurs when user is authenticated but not authorized to access the resource.

```json
{
  "message": "Not authorized to access this resource"
}
```

### 404 Not Found
Occurs when the requested resource doesn't exist.

```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
Occurs when there's a server-side error.

```json
{
  "message": "Server error",
  "error": "Error details (only in development mode)"
}
```

---

## Authentication Flow

### 1. Registration/Login Flow
```
1. User registers/logs in
2. Server responds with accessToken and refreshToken
3. Client stores both tokens (accessToken in memory, refreshToken in localStorage)
4. Server sets refreshToken as HttpOnly cookie (optional, for enhanced security)
```

### 2. Making Authenticated Requests
```
1. Include accessToken in Authorization header: Bearer <accessToken>
2. Make API request
3. If token is valid, request succeeds
4. If token is expired, proceed to token refresh flow
```

### 3. Token Refresh Flow
```
1. Client receives 401 response with "Token expired" message
2. Client sends refreshToken to /api/auth/refresh
3. Server validates refreshToken
4. Server issues new accessToken
5. Client retries original request with new accessToken
```

### 4. Logout Flow
```
1. Client sends logout request with accessToken
2. Server clears refreshToken cookie
3. Client removes tokens from storage
4. Client redirects to login page
```

---

## Cookie Requirements

### RefreshToken Cookie

**Cookie Name:** `refreshToken`

**Properties:**
- **HttpOnly**: `true` (prevents JavaScript access, XSS protection)
- **Secure**: `true` (only sent over HTTPS in production)
- **SameSite**: `Strict` (CSRF protection)
- **Max-Age**: `604800` seconds (7 days)
- **Path**: `/`

**Set By Endpoints:**
- POST /api/auth/register
- POST /api/auth/login

**Cleared By Endpoints:**
- POST /api/auth/logout

**Used By Endpoints:**
- POST /api/auth/refresh (optional, can also use request body)

---

## Rate Limiting (Future Enhancement)

Consider implementing rate limiting for production:

- **Authentication endpoints**: 5 requests per 15 minutes per IP
- **Other endpoints**: 100 requests per 15 minutes per user

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"test123"}'
```

### Get All Projects
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Project","description":"Project description"}'
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/projects/PROJECT_ID/tasks \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","status":"Todo","priority":"High"}'
```

---

## Testing with Postman

1. **Import Collection**: Create a new collection called "Task Management API"
2. **Set Environment Variables**:
   - `baseUrl`: `http://localhost:5000/api`
   - `accessToken`: (set after login)
3. **Authentication**: Use "Bearer Token" type and reference `{{accessToken}}`
4. **Test Flow**: Register → Login → Get Projects → Create Project → Create Task

---

## Changelog

### Version 1.0.0 (January 2026)
- Initial API release
- 18 endpoints implemented
- JWT authentication
- CRUD operations for projects and tasks
- Task filtering and statistics

---

**Documentation Last Updated:** January 11, 2026

**API Version:** 1.0.0

**Contact:** Fahad - Full-Stack Web Developer
