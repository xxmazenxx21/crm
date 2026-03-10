# CRM Project Complete Setup Guide

## Project Overview

This is a professional-grade CRM (Customer Relationship Management) system designed for sales teams to manage customer meeting appointments. The system includes role-based access control for sales representatives and managers.

## Complete Folder Structure

```
crm/
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   ├── meetingsController.js    # Meeting CRUD operations
│   │   └── usersController.js       # User management
│   ├── middleware/
│   │   ├── auth.js                  # JWT authentication middleware
│   │   └── roleCheck.js             # Role-based authorization
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   └── Meeting.js               # Meeting schema
│   ├── routes/
│   │   ├── auth.js                  # Auth endpoints
│   │   ├── meetings.js              # Meeting endpoints
│   │   └── users.js                 # User endpoints
│   ├── utils/
│   │   └── errorHandler.js          # Error handling utilities
│   ├── .env.example                 # Environment template
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Dependencies
│   ├── seed.js                      # Database seeding script
│   ├── server.js                    # Server entry point
│   └── README.md                    # Backend documentation
│
├── frontend/
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateMeetingModal.tsx      # Meeting creation modal
│   │   │   ├── DayFilter.tsx               # Day filtering component
│   │   │   ├── MeetingCard.tsx             # Meeting display component
│   │   │   └── Navbar.tsx                  # Navigation bar
│   │   ├── hooks/
│   │   │   ├── useAuth.ts                  # Auth state hook
│   │   │   └── useMeetings.ts              # Meetings state hook
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx               # Login page
│   │   │   ├── SalesDashboard.tsx          # Sales user dashboard
│   │   │   └── ManagerDashboard.tsx        # Manager dashboard
│   │   ├── services/
│   │   │   ├── api.ts                      # Axios instance
│   │   │   ├── auth.ts                     # Auth API calls
│   │   │   ├── meetings.ts                 # Meetings API calls
│   │   │   └── users.ts                    # Users API calls
│   │   ├── types/
│   │   │   └── index.ts                    # TypeScript interfaces
│   │   ├── App.tsx                         # Main app component
│   │   ├── index.css                       # Global styles
│   │   ├── main.tsx                        # Entry point
│   │   └── README.md                       # Frontend documentation
│   ├── .env.example                 # Environment template
│   ├── .gitignore                   # Git ignore rules
│   ├── index.html                   # HTML template
│   ├── package.json                 # Dependencies
│   ├── postcss.config.js            # PostCSS configuration
│   ├── tailwind.config.js           # TailwindCSS configuration
│   ├── tsconfig.json                # TypeScript config
│   ├── tsconfig.node.json           # TypeScript node config
│   └── vite.config.ts               # Vite configuration
│
├── .gitignore                       # Root git ignore
└── README.md                        # Main documentation
```

## Installation & Setup

### Step 1: Clone/Navigate to Project

```bash
cd c:\Users\Tester\Desktop\crm
```

### Step 2: Backend Setup

#### 2.1 Install Backend Dependencies

```bash
cd backend
npm install
```

#### 2.2 Configure Environment

```bash
cp .env.example .env
```

Edit `.env` file:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/crm-sales
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

#### 2.3 Seed Database with Demo Data

```bash
node seed.js
```

This creates:
- Sales User: sales@example.com / password123
- Sales User: ahmed@example.com / password123
- Manager User: manager@example.com / password123

#### 2.4 Start Backend Server

```bash
npm run dev
```

Server runs on: http://localhost:5000
API Base: http://localhost:5000/api

### Step 3: Frontend Setup

#### 3.1 Navigate to Frontend

```bash
cd ../frontend
```

#### 3.2 Install Frontend Dependencies

```bash
npm install
```

#### 3.3 Configure Environment (Optional)

```bash
cp .env.example .env
```

Default configuration works for local development.

#### 3.4 Start Frontend Development Server

```bash
npm run dev
```

Application runs on: http://localhost:5173

## Running the Project

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Visit http://localhost:5173 in your browser.

## Login with Demo Accounts

### Sales Account
- Email: `sales@example.com`
- Password: `password123`

Features:
- Create meetings
- View all meetings
- Filter by day
- Delete own meetings
- View other sales meetings (read-only)

### Manager Account
- Email: `manager@example.com`
- Password: `password123`

Features:
- View all meetings
- See which sales created each meeting
- Create meetings
- Delete any meeting
- Analytics dashboard

## Key Features

### ✅ Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Secure password hashing
- Token expiration and refresh

### ✅ Meeting Management
- Create meetings with customer details
- Update meeting information
- Delete meetings (with authorization)
- Filter meetings by date
- View meeting details

### ✅ Sales Dashboard
- Personal meeting list
- Team meetings view (read-only)
- Day-based filtering
- Client information display
- Easy meeting creation

### ✅ Manager Dashboard
- Complete team oversight
- Sales person attribution
- Full meeting management
- Statistics dashboard
- Team performance tracking

### ✅ User Experience
- Responsive design
- Real-time updates
- Form validation
- Error handling
- Intuitive navigation

## API Endpoints Reference

### Authentication
```
POST   /api/auth/login            - User login
POST   /api/auth/register         - User registration (optional)
POST   /api/auth/logout           - User logout
```

### Meetings
```
POST   /api/meetings              - Create meeting
GET    /api/meetings              - Get all meetings
GET    /api/meetings/:id          - Get single meeting
GET    /api/meetings/day/:date    - Get meetings for a date
PATCH  /api/meetings/:id          - Update meeting
DELETE /api/meetings/:id          - Delete meeting
```

### Users
```
GET    /api/users/me              - Get current user
GET    /api/users                 - Get all users (manager only)
GET    /api/users/role/:role      - Get users by role (manager only)
```

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,           // User's full name
  email: String,          // Unique email
  password: String,       // Hashed password
  role: String,           // 'sales' or 'manager'
  createdAt: Date,
  updatedAt: Date
}
```

### Meeting Collection
```javascript
{
  _id: ObjectId,
  customerName: String,   // Customer full name
  phone: String,          // Phone number
  storeName: String,      // Business name
  storeLink: String,      // Optional website/link
  meetingDate: Date,      // Meeting scheduled date
  meetingTime: String,    // Time (HH:MM format)
  notes: String,          // Additional notes
  createdBy: ObjectId,    // Reference to User
  createdAt: Date,
  updatedAt: Date
}
```

## Development Guidelines

### Code Organization
- Separation of concerns (models, controllers, routes)
- Clean folder structure
- Reusable components
- Custom hooks for logic

### Best Practices
- Error handling on both frontend and backend
- Input validation before operations
- Authentication checks on protected routes
- Proper HTTP status codes
- TypeScript for type safety

### Security Features
- Password hashing with bcryptjs
- JWT token authentication
- Role-based authorization
- CORS protection
- Protected API routes

## Building for Production

### Backend Production Build
1. Set environment variables:
   ```env
   NODE_ENV=production
   JWT_SECRET=<strong-secret-key>
   MONGODB_URI=<production-mongo-uri>
   ```

2. Start server:
   ```bash
   npm start
   ```

### Frontend Production Build
1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy `dist` folder to:
   - Vercel
   - Netlify
   - Static hosting service
   - Your own server

3. Update `VITE_API_URL` to production API URL

## Troubleshooting

### Backend Issues

**MongoDB Connection Error**
- Ensure MongoDB is running locally: `mongod`
- Or update MONGODB_URI to cloud MongoDB (MongoDB Atlas)
- Check connection string format

**Port Already in Use**
- Change PORT in `.env` file
- Or kill process using port 5000: `netstat -ano | findstr :5000`

**Authentication Errors**
- Verify JWT_SECRET is set in `.env`
- Check token hasn't expired
- Ensure headers include Authorization: Bearer <token>

### Frontend Issues

**Cannot Connect to API**
- Verify backend is running on port 5000
- Check VITE_API_URL in `.env`
- Open browser console for error details

**Login Fails**
- Verify demo users exist (run `node seed.js`)
- Check backend is responding to `/api/auth/login`
- Review browser DevTools Network tab

**CORS Errors**
- Check FRONTEND_URL matches in backend `.env`
- Verify backend CORS middleware is enabled
- Ensure frontend is on allowed origin

## Performance Optimization

### Backend
- MongoDB indexes on frequently queried fields
- Pagination for large datasets
- Request/response compression

### Frontend
- Code splitting with React
- Image optimization
- Lazy loading of components
- Caching strategies

## Future Enhancement Ideas

1. **Email Notifications**
   - Meeting reminders
   - Reminder emails

2. **Advanced Analytics**
   - Sales performance metrics
   - Meeting completion rates
   - Customer follow-up tracking

3. **Calendar Integration**
   - Google Calendar sync
   - Outlook integration
   - iCal export

4. **Mobile App**
   - React Native version
   - Native iOS/Android apps

5. **Advanced Features**
   - Meeting recording
   - Document sharing
   - Video conferencing
   - Multi-language support

## Support & Documentation

- Backend: [backend/README.md](./backend/README.md)
- Frontend: [frontend/src/README.md](./frontend/src/README.md)
- Main: [README.md](./README.md)

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT
- bcryptjs
- CORS

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router
- Axios
- Lucide React Icons

---

**Created:** March 2026
**Version:** 1.0.0
**Status:** Production Ready
