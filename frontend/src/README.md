# CRM Frontend

Modern React-based frontend for the Sales Meeting Management CRM system.

## Features

- User authentication with JWT tokens
- Role-based access control (Sales & Manager)
- Responsive design with TailwindCSS
- Meeting creation and management
- Day-based filtering
- Real-time UI updates
- TypeScript support

## Prerequisites

- Node.js (v18+)
- npm or yarn

## Installation

1. **Navigate to frontend directory**

```bash
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file:

```bash
cp .env.example .env
```

Default configuration:

```
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable React components
│   ├── Navbar.tsx
│   ├── MeetingCard.tsx
│   ├── CreateMeetingModal.tsx
│   └── DayFilter.tsx
├── pages/           # Page components
│   ├── LoginPage.tsx
│   ├── SalesDashboard.tsx
│   └── ManagerDashboard.tsx
├── services/        # API service layer
│   ├── api.ts
│   ├── auth.ts
│   ├── meetings.ts
│   └── users.ts
├── hooks/           # Custom React hooks
│   ├── useAuth.ts
│   └── useMeetings.ts
├── types/           # TypeScript interfaces
│   └── index.ts
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

## Authentication Flow

1. User enters email/password on login page
2. Credentials sent to backend `/api/auth/login`
3. JWT token received and stored in localStorage
4. Token automatically added to API requests via axios interceptor
5. On authentication failure, user redirected to login

## Pages

### Login Page
- Email and password input
- Demo credentials display
- Error handling
- Redirect to dashboard on successful login

### Sales Dashboard
- View all team meetings
- Filter meetings by day
- Create new meetings
- Delete own meetings
- View other sales person's meetings (read-only)

### Manager Dashboard
- View all meetings from all sales team
- See which sales person created each meeting
- Full meeting management capabilities
- Statistics dashboard (total meetings, team members)
- Day-based filtering

## Components

### Navbar
- Displays current user info
- Shows user role
- Logout functionality
- Responsive mobile menu

### MeetingCard
- Displays meeting details
- Shows customer info, date, time
- Shows created by information
- Delete button (if authorized)

### CreateMeetingModal
- Form to create new meetings
- Required and optional fields
- Form validation
- Error handling

### DayFilter
- Dropdown to filter by weekday
- Fetches meetings for selected day
- Clear filter option

## API Integration

The frontend communicates with the backend via REST API using axios. All API calls are implemented in the `services/` folder:

- `api.ts` - Axios instance and interceptors
- `auth.ts` - Authentication endpoints
- `meetings.ts` - Meeting CRUD endpoints
- `users.ts` - User endpoints

## Styling

The project uses TailwindCSS for styling:
- Utility-first CSS framework
- Custom primary color palette
- Responsive breakpoints (mobile-first)
- Dark mode ready

## Error Handling

- API errors automatically redirect to login on 401 status
- User-friendly error messages displayed in UI
- Form validation before submission
- Network error handling

## Development Notes

- Components are fully typed with TypeScript
- Custom hooks manage business logic
- React Router handles page navigation
- Protected routes based on user role
- Local storage used for token persistence
