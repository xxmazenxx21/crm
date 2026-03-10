# CRM Backend

Sales team CRM system backend built with Node.js, Express, and MongoDB.

## Features

- JWT-based authentication
- Role-based access control (Sales, Manager)
- Meeting management with customer information
- Database persistence with MongoDB and Mongoose
- Error handling and validation
- CORS support

## Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Clone the repository** (or navigate to the backend folder)

```bash
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/crm-sales
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

## Running the Server

### Development Mode (with hot reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Meetings

- `POST /api/meetings` - Create a new meeting
- `GET /api/meetings` - Get all meetings
- `GET /api/meetings/:id` - Get single meeting
- `GET /api/meetings/day/:date` - Get meetings for a specific day
- `GET /api/meetings/manager/all` - Get all meetings (manager only)
- `PATCH /api/meetings/:id` - Update meeting
- `DELETE /api/meetings/:id` - Delete meeting

### Users

- `GET /api/users/me` - Get current user
- `GET /api/users` - Get all users (manager only)
- `GET /api/users/role/:role` - Get users by role (manager only)

## Database Schema

### User

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String ('sales' | 'manager'),
  createdAt: Date,
  updatedAt: Date
}
```

### Meeting

```javascript
{
  _id: ObjectId,
  customerName: String,
  phone: String,
  storeName: String,
  storeLink: String (optional),
  meetingDate: Date,
  meetingTime: String (HH:MM format),
  notes: String,
  createdBy: ObjectId (User reference),
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## Development Notes

- All passwords are hashed using bcryptjs before storing
- JWT tokens expire after 7 days (configurable)
- CORS is enabled for the frontend URL
- MongoDB indexes are created for performance
