# 🚀 Quick Start Guide

Get the CRM system up and running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- MongoDB running locally (or MongoDB Atlas account)
- Two terminal windows/tabs

## Step 1: Clone to your computer
```bash
# Already done - navigate to project
cd c:\Users\Tester\Desktop\crm
```

## Step 2: Backend Setup (Terminal 1)

```bash
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Seed demo users (important!)
node seed.js

# Start backend
npm run dev
```

✅ Backend running: http://localhost:5000

## Step 3: Frontend Setup (Terminal 2)

```bash
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

✅ Frontend running: http://localhost:5173

## Step 4: Login to the System

Open http://localhost:5173 and login with:

### Option A: Sales User
```
Email: sales@example.com
Password: password123
```

### Option B: Manager User
```
Email: manager@example.com
Password: password123
```

## 📋 What You Can Do

### Sales Dashboard
- ✅ Create new meetings
- ✅ Filter meetings by day
- ✅ View all team meetings  
- ✅ Delete your own meetings

### Manager Dashboard
- ✅ View all team meetings
- ✅ See who created each meeting
- ✅ Full meeting management
- ✅ Team statistics

## 📁 Project Structure

```
crm/
├── backend/          → Node.js + Express API
├── frontend/         → React + TypeScript UI
├── README.md         → Full documentation
└── SETUP_GUIDE.md    → Detailed setup
```

## 🔧 Common Commands

**Backend:**
```bash
cd backend
npm run dev      # Development mode
npm start        # Production mode
node seed.js     # Seed database
```

**Frontend:**
```bash
cd frontend
npm run dev      # Development mode
npm run build    # Production build
npm run preview  # Preview build
```

## ✨ Features

- 🔐 JWT Authentication
- 👥 Role-based Access Control
- 📅 Meeting Management
- 📊 Manager Dashboard
- 🎨 Responsive UI
- ⚡ Real-time Updates

## 🐛 Troubleshooting

**Backend won't start?**
- Check MongoDB is running: `mongod`
- Verify port 5000 is free
- Check `.env` file exists

**Frontend won't connect?**
- Verify backend is running
- Check browser console for errors
- Clear localStorage and try again

**Login fails?**
- Run `node seed.js` to create demo users
- Check backend logs for errors

## 📚 Full Documentation

- [Main README](./README.md)
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/src/README.md)
- [Complete Setup Guide](./SETUP_GUIDE.md)

---

Happy coding! 🎉
