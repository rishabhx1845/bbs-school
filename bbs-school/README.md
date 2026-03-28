# 🏫 BBS Smart Public School, Patel Nagar — Official Website

A complete full-stack school management website built with React.js, Node.js, Express, and MongoDB.

---

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Deployment Guide](#deployment-guide)
- [Contributing](#contributing)

---

## 🌟 Project Overview

BBS Smart Public School website is a full-stack web application featuring:
- A modern, responsive public-facing website
- Admin dashboard for school management
- Student dashboard for personal portal
- RESTful API backend with JWT authentication
- MongoDB database with proper schema validation

---

## ✨ Features

### Public Website
- 🏠 Home page with hero slider, announcements popup, highlights
- 📖 About Us with history, vision, mission, principal's message
- 🎓 Academics — classes, subjects, curriculum
- 📝 Admissions — online form with validation
- 🖼️ Gallery — grid + lightbox view
- 📞 Contact Us — form, map embed, details
- 🌙 Dark mode toggle
- 📱 Fully responsive (mobile/tablet/desktop)
- ⚡ Lazy loading images
- ♿ Accessibility (alt tags, ARIA labels)

### Admin Dashboard
- 🔐 Secure JWT login
- 👨‍🎓 Student CRUD management
- 📊 Result upload/management
- 📢 Notice post/edit/delete
- 📋 Admission requests view
- 📈 Analytics overview

### Student Dashboard
- 👤 Personal profile view
- 📝 View results
- 📣 View notices/announcements

### Security
- JWT authentication
- bcrypt password hashing
- Role-based access control (Admin / Teacher / Student)
- Rate limiting
- CORS configuration
- Helmet security headers

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18, Tailwind CSS 3, React Router v6 |
| State | React Context API |
| Animations | Framer Motion |
| Icons | React Icons |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Security | Helmet, express-rate-limit, cors |
| Logging | Morgan, Winston |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas |

---

## 📁 Folder Structure

```
bbs-school/
├── frontend/                    # React.js application
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── images/             # Place your 10 school images here
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Navbar, Footer, Button, Card, Spinner
│   │   │   ├── home/           # Hero, Slider, Highlights, Announcements
│   │   │   ├── about/          # History, Vision, PrincipalMessage
│   │   │   ├── academics/      # Classes, Subjects, Curriculum
│   │   │   ├── admissions/     # AdmissionForm
│   │   │   ├── gallery/        # GalleryGrid, Lightbox
│   │   │   ├── contact/        # ContactForm, MapEmbed
│   │   │   └── dashboard/      # AdminDash, StudentDash
│   │   ├── pages/              # Route-level page components
│   │   ├── context/            # Auth, Theme contexts
│   │   ├── hooks/              # Custom hooks
│   │   ├── utils/              # API helpers, validators
│   │   └── styles/             # Global CSS
│   ├── .env.example
│   ├── tailwind.config.js
│   ├── package.json
│   └── vercel.json
│
├── backend/                     # Node.js/Express application
│   ├── src/
│   │   ├── config/             # DB connection, env
│   │   ├── controllers/        # Business logic
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # Express routes
│   │   ├── middleware/         # Auth, error, logging
│   │   └── utils/              # Helpers
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── docs/
│   └── API.md                  # Full API documentation
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js >= 18.x
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/bbs-school.git
cd bbs-school
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your values
npm start
```

### 4. Seed Database (optional)
```bash
cd backend
npm run seed
```

---

## 🔑 Environment Variables

### Backend `.env`
```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/bbs_school
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SCHOOL_NAME=BBS Smart Public School
```

---

## 🚀 Deployment Guide

### Frontend → Vercel
1. Push frontend folder to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy — Vercel auto-detects React

### Backend → Render
1. Push backend folder to GitHub
2. Create new Web Service on [render.com](https://render.com)
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add environment variables in Render dashboard

### Database → MongoDB Atlas
1. Create free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Add IP whitelist: `0.0.0.0/0` (allow all)
3. Create database user
4. Copy connection string to `MONGODB_URI`

---

## 📸 Adding Your School Images

Place your 10 school images in:
```
frontend/public/images/
  school1.jpg
  school2.jpg
  ...
  school10.jpg
```

Images are used in:
- Homepage hero slider (all 10)
- Gallery section (all 10)

---

## 📄 License
MIT License — BBS Smart Public School, Patel Nagar
