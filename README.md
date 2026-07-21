# User Authentication API

User Authentication API with JWT, bcrypt, registration, login, protected routes and Student CRUD with pagination & filtering.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
 
## Features 
    
### Auth
- User registration with name, email and password
- User login with email and password
- JWT-based token authentication
- Password hashing with bcrypt (12 salt rounds)
- Protected route (/api/auth/profile) requiring valid JWT

### Students
- Create, read, update and delete students
- Full update (PUT) and partial update (PATCH)
- Pagination via `?page=1&limit=10`
- Filtering by status via `?status=active`
 
## Project Structure

```
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js   # Auth logic
│   └── studentController.js# Student CRUD
├── middleware/
│   └── auth.js             # JWT verification middleware
├── models/
│   ├── User.js             # User schema
│   └── Student.js          # Student schema
├── routes/
│   ├── authRoutes.js       # Auth route definitions
│   └── studentRoutes.js    # Student route definitions
├── database/
│   ├── seed.js             # Database seeding script
│   └── users.json          # MongoDB export sample
├── server.js               # Entry point
├── .env                    # Environment variables
├── package.json
└── README.md
```

## API Endpoints

### Auth Endpoints

#### POST /api/auth/register
**Request Body:**
```json
{ "name": "John Doe", "email": "john@example.com", "password": "password123" }
```
**Response (201):** `{ "success": true, "token": "<JWT>", "data": { "user": { "id", "name", "email" } } }`

#### POST /api/auth/login
**Request Body:**
```json
{ "email": "john@example.com", "password": "password123" }
```
**Response (200):** `{ "success": true, "token": "<JWT>", "data": { "user": { "id", "name", "email" } } }`

#### GET /api/auth/profile (Protected)
**Header:** `Authorization: Bearer <token>`
**Response (200):** `{ "success": true, "data": { "user": { "id", "name", "email", "createdAt" } } }`

### Student Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/students | Create a new student |
| GET | /api/students | Get all students (paginated) |
| GET | /api/students?status=active | Filter by status |
| GET | /api/students/:id | Get student by ID |
| PUT | /api/students/:id | Full update student |
| PATCH | /api/students/:id | Partial update student |
| DELETE | /api/students/:id | Delete student |

#### POST /api/students
**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 20,
  "grade": "A",
  "status": "active"
}
```
**Response (201):** `{ "success": true, "data": { student } }`

#### GET /api/students
**Query params:** `page=1&limit=10&status=active`
**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "total": 25,
  "page": 1,
  "totalPages": 3,
  "data": [ ... ]
}
``` 

#### GET /api/students/:id
**Response (200):** `{ "success": true, "data": { student } }`

#### PUT /api/students/:id
Full update — requires name, email, age, grade.
**Response (200):** `{ "success": true, "data": { student } }`

#### PATCH /api/students/:id
Partial update — only sends changed fields.
**Response (200):** `{ "success": true, "data": { student } }`

#### DELETE /api/students/:id
**Response (200):** `{ "success": true, "message": "Student deleted successfully" }`

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies:**
   ```
   npm install
   ```
3. **Configure environment variables** in `.env`:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/auth_api
   JWT_SECRET=your_jwt_secret_key_change_in_production
   JWT_EXPIRES_IN=7d
   ```
4. **Start MongoDB** (locally or use MongoDB Atlas)
5. **Run the server:**
   ```
   npm start
   ```
   Or with auto-restart:
   ```
   npm run dev
   ```
6. **Test with Postman** – import `postman_collection.json`

## Testing with Postman

1. Import `postman_collection.json` into Postman
2. Use **Register** endpoint to create a new user
3. Use **Login** to get a JWT token (auto-saves to collection variable)
4. Use **Get Profile** to access the protected route
5. Use **Students > Create Student** to add a student
6. Use **Get All Students** to list with pagination
7. Use **Get Students by Status** to filter
8. Use **Get Student by ID**, **Update**, **Patch**, **Delete** to test CRUD


---------------------------------------------------------------------------------------------------------------------
Created By: 
  [@Monesh Devadiga](https://github.com/Monesh-Devadiga)
