# 🚀 MERN Todo App — Full Deployment Guide

## Project Structure

```
mern-todo/
├── backend/                   ← Node + Express + MongoDB
│   ├── controllers/
│   │   └── todoController.js  ← All CRUD logic lives here
│   ├── models/
│   │   └── Todo.js            ← Mongoose schema/model
│   ├── routes/
│   │   └── todoRoutes.js      ← URL → controller mapping
│   ├── .env.example           ← Template for environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js              ← App entry point
│
└── frontend/                  ← React + Vite + Tailwind CSS
    ├── src/
    │   ├── api/
    │   │   └── todoAPI.js     ← All Axios calls in one place
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── TodoForm.jsx
    │   │   ├── TodoItem.jsx
    │   │   ├── TodoList.jsx
    │   │   └── FilterBar.jsx
    │   ├── hooks/
    │   │   └── useTodos.js    ← Custom hook: state + API calls
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## API Endpoints

| Method | URL                       | Action              |
|--------|---------------------------|---------------------|
| GET    | /api/todos                | Get all todos       |
| GET    | /api/todos?completed=true | Filter by status    |
| POST   | /api/todos                | Create a todo       |
| GET    | /api/todos/:id            | Get one todo        |
| PUT    | /api/todos/:id            | Update a todo       |
| PATCH  | /api/todos/:id/toggle     | Toggle completed    |
| DELETE | /api/todos/:id            | Delete a todo       |

---

## Step 1 — Local Development Setup

### A. Backend

```bash
cd backend
npm install
cp .env.example .env       # Fill in your MONGO_URI
npm run dev                # Runs on http://localhost:5000
```

### B. Frontend

```bash
cd frontend
npm install
cp .env.example .env       # VITE_API_URL=http://localhost:5000/api
npm run dev                # Runs on http://localhost:5173
```

---

## Step 2 — MongoDB Atlas Setup (Free Cloud DB)

1. Go to https://cloud.mongodb.com and create a free account
2. Create a **free M0 cluster**
3. Click **Database Access** → Add a database user (username + password)
4. Click **Network Access** → Add IP Address → **Allow access from anywhere** (0.0.0.0/0)
5. Click **Connect** → **Connect your application** → Copy the connection string

Your MONGO_URI will look like:
```
mongodb+srv://myuser:mypassword@cluster0.abcde.mongodb.net/mern-todo?retryWrites=true&w=majority
```

---

## Step 3 — Deploy Backend to Render (Free)

Render hosts your Node.js server.

1. **Push backend to GitHub**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend"
   # Create a repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/mern-todo-backend.git
   git push -u origin main
   ```

2. **Go to https://render.com** and sign in with GitHub

3. Click **New → Web Service** → Connect your `mern-todo-backend` repo

4. Fill in the settings:
   | Field            | Value                  |
   |------------------|------------------------|
   | Name             | mern-todo-backend      |
   | Runtime          | Node                   |
   | Build Command    | `npm install`          |
   | Start Command    | `npm start`            |
   | Instance Type    | Free                   |

5. Scroll down to **Environment Variables** and add:
   ```
   MONGO_URI  =  mongodb+srv://...your Atlas URI...
   CLIENT_URL =  https://your-app.vercel.app   ← fill this after frontend deploy
   ```

6. Click **Create Web Service** — Render will build and deploy

7. **Copy your backend URL** — it will look like:
   ```
   https://mern-todo-backend.onrender.com
   ```

> ⚠️ Free Render services sleep after 15 minutes of inactivity. First request may take ~30 seconds to wake up.

---

## Step 4 — Deploy Frontend to Vercel (Free)

1. **Push frontend to GitHub**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial frontend"
   # Create a repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/mern-todo-frontend.git
   git push -u origin main
   ```

2. **Go to https://vercel.com** and sign in with GitHub

3. Click **Add New → Project** → Import your `mern-todo-frontend` repo

4. Vercel auto-detects Vite. Confirm these settings:
   | Field          | Value         |
   |----------------|---------------|
   | Framework      | Vite          |
   | Build Command  | `npm run build`|
   | Output Dir     | `dist`        |

5. Expand **Environment Variables** and add:
   ```
   VITE_API_URL = https://mern-todo-backend.onrender.com/api
   ```
   ← Use the Render URL you copied in Step 3

6. Click **Deploy** — Vercel builds and gives you a live URL like:
   ```
   https://mern-todo-frontend.vercel.app
   ```

---

## Step 5 — Connect Backend CORS to Frontend

Go back to Render → your backend service → Environment:
- Update `CLIENT_URL` to your Vercel URL:
  ```
  CLIENT_URL = https://mern-todo-frontend.vercel.app
  ```
- Click **Save Changes** — Render will redeploy automatically

---

## How Environment Variables Flow

```
Local Development:
  frontend/.env  →  VITE_API_URL=http://localhost:5000/api
  backend/.env   →  MONGO_URI=mongodb+srv://...  CLIENT_URL=http://localhost:5173

Production:
  Vercel (frontend)  →  VITE_API_URL=https://your-backend.onrender.com/api
  Render (backend)   →  MONGO_URI=...  CLIENT_URL=https://your-frontend.vercel.app
```

> 🔑 **Key rule**: Never commit `.env` files to Git. Always use `.env.example` as a template.

---

## How Data Flows in MERN

```
User clicks "Add Task"
       ↓
React (TodoForm.jsx)       — collects form data
       ↓
useTodos.js (hook)         — calls addTodo()
       ↓
todoAPI.js (axios)         — POST https://backend.onrender.com/api/todos
       ↓
Express server.js          — receives request
       ↓
todoRoutes.js              — matches POST /api/todos
       ↓
todoController.js          — creates Todo via Mongoose
       ↓
MongoDB Atlas              — saves document to database
       ↓
Response flows back up     — todo object returned
       ↓
React state updated        — UI re-renders with new task
```

---

## Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| CORS error in browser | Make sure `CLIENT_URL` in Render matches your Vercel URL exactly |
| `VITE_API_URL` is undefined | Must start with `VITE_` and restart dev server after changes |
| MongoDB connection fails | Check Network Access in Atlas → allow 0.0.0.0/0 |
| Render URL returns 502 | Wait 30s — free tier is waking up |
| Build fails on Vercel | Make sure `dist` is the output dir and `npm run build` works locally |

---

## Continuous Deployment (Auto-Deploy)

Both Vercel and Render watch your GitHub repo. Any time you:
```bash
git push origin main
```
→ Vercel rebuilds and deploys frontend automatically  
→ Render rebuilds and deploys backend automatically
