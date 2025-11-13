# Inbotiq Assignment

This repository contains a small full-stack application built for the Inbotiq assignment.  
It includes an Express + TypeScript backend and a Next.js frontend with authentication using httpOnly cookies.

---

## 🚀 Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS, Axios  
- **Backend:** Node.js, Express, TypeScript  
- **Database:** PostgreSQL (Prisma ORM)  
- **Auth:** JWT + httpOnly Cookies  
- **Deployment:** Render (backend)

---

## 📁 Folder Structure
```
inbotiq-assignement/
├─ backend/
└─ frontend/
```

---

# 🔧 How to Run the Project Locally

## 1️⃣ Clone the repo
```bash
git clone https://github.com/DeepakLabade/inbotiq-assignement.git
cd inbotiq-assignement
```

---

# 🛠 Backend Setup

### 2️⃣ Go to the backend folder
```bash
cd backend
```

### 3️⃣ Install dependencies
```bash
npm install
```

### 4️⃣ Create a `.env` file inside `backend/`
Example:
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_jwt_secret_here"
NODE_ENV="development"
PORT=8080
```

### 5️⃣ Set up Prisma

#### Generate Prisma client
```bash
npx prisma generate
```

#### Run migrations (creates DB tables)
```bash
npx prisma migrate dev --name init
```

#### Optional: View Prisma Studio
```bash
npx prisma studio
```

### 6️⃣ Build and run the backend
```bash
npm run build
npm start
```

The backend will run on:
```
http://localhost:8080
```

---

# 🎨 Frontend Setup

### 1️⃣ Go to the frontend folder
```bash
cd ../frontend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create a `.env.local` file
```
NEXT_PUBLIC_API_URL="http://localhost:8080"
```

### 4️⃣ Run the frontend
```bash
npm run dev
```

The app will be available at:
```
http://localhost:3000
```

---

# 📡 API Endpoints

### **Auth**
- `POST /api/v1/auth/register` — register user  
- `POST /api/v1/auth/login` — login + set cookie  
- `POST /api/v1/auth/logout` — logout  
- `GET /api/v1/user/me` — get logged‑in user  

---

