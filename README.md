# CRM - Sales Meeting Management System

Full-stack CRM application for managing sales team meetings and customer interactions.

## Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud)
- npm or yarn

### Project Structure

```
crm/
├── backend/          # Node.js Express API
├── frontend/         # React + TypeScript frontend
└── README.md
```

## Backend Setup

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

See [backend/README.md](./backend/README.md) for detailed backend documentation.

## Frontend Setup

1. **Navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** (optional)
   ```bash
   cp .env.example .env
   # Default API URL is http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Application runs on `http://localhost:5173`

See [frontend/src/README.md](./frontend/src/README.md) for detailed frontend documentation.

## Demo Credentials

### Sales User
- **Email:** sales@example.com
- **Password:** password123

### Manager User
- **Email:** manager@example.com
- **Password:** password123

## Features

### Sales Users Can:
✅ Login to the system
✅ Create meetings with customer information
✅ View their own meetings
✅ View other sales employees' meetings (read-only)
✅ Filter meetings by day
✅ Manage their own meetings

### Manager Users Can:
✅ Login to dashboard
✅ View ALL meetings from all sales employees
✅ See which sales person created each meeting
✅ Create meetings
✅ Delete any meeting
✅ Analytics dashboard (total meetings, team size)
✅ Filter meetings by day

## Meeting Information

Each meeting captures:
- Customer name
- Phone number
- Store/business name
- Store link (optional)
- Meeting date and time
- Notes
- Sales person who created it
- Timestamps (created, updated)

## Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs for password hashing
- **CORS:** Enabled for frontend communication

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Icons:** Lucide React

## API Endpoints

### Authentication
```
POST /api/auth/login         - User login
POST /api/auth/register      - User registration
POST /api/auth/logout        - User logout
```

### Meetings
```
POST   /api/meetings         - Create meeting
GET    /api/meetings         - Get all meetings
GET    /api/meetings/:id     - Get single meeting
GET    /api/meetings/day/:date - Get meetings by day
GET    /api/meetings/manager/all - Get all meetings (manager only)
PATCH  /api/meetings/:id     - Update meeting
DELETE /api/meetings/:id     - Delete meeting
```

### Users
```
GET /api/users/me            - Get current user
GET /api/users               - Get all users (manager only)
GET /api/users/role/:role    - Get users by role (manager only)
```

## Database Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'sales' | 'manager',
  createdAt: Date,
  updatedAt: Date
}
```

### Meeting Schema
```javascript
{
  customerName: String,
  phone: String,
  storeName: String,
  storeLink: String (optional),
  meetingDate: Date,
  meetingTime: String (HH:MM),
  notes: String,
  createdBy: Reference to User,
  createdAt: Date,
  updatedAt: Date
}
```

## Debugging & Development

### Backend Debugging
- Server logs requests and database operations
- MongoDB connection status logged on startup
- Error responses with descriptive messages
- Token validation in headers

### Frontend Debugging
- Check browser console for API errors
- Verify localStorage contains token
- Network tab shows API requests/responses
- Component state visible in React DevTools

## Security Features

✅ Password hashing with bcryptjs
✅ JWT token-based authentication
✅ Role-based access control
✅ CORS enabled
✅ Protected routes on frontend
✅ Token expiration (7 days)
✅ Secure HTTP headers

## Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Set production MongoDB URI
4. Enable HTTPS
5. Set appropriate CORS origin

### Frontend
1. Run `npm run build`
2. Deploy `dist` folder to static hosting
3. Update `VITE_API_URL` for production API
4. Configure CDN for assets

## Troubleshooting

### Backend won't start
- Check MongoDB connection
- Verify port 5000 is available
- Check `.env` file exists and is configured

### Frontend won't connect to API
- Ensure backend is running on port 5000
- Check CORS configuration in backend
- Verify JWT token in localStorage

### Login fails
- Ensure user exists in database
- Check password is correct
- Verify JWT_SECRET matches

## Future Enhancements

- Meeting notifications/reminders
- Meeting rescheduling
- Customer relationship tracking
- Meeting notes and attachments
- Export meetings to calendar
- Email integration
- SMS notifications
- Better analytics and reporting
- User activity logs

## Support

For issues or questions, check the individual README files:
- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/src/README.md)

---

**Version:** 1.0.0
**Last Updated:** March 2026
