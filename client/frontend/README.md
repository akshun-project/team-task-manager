 # Team Task Manager

A full-stack collaborative workspace management platform built for modern teams to create projects, onboard members, assign deliverables, and monitor execution progress in real time.

## Live Demo
Frontend: https://team-task-manager-ten-tawny.vercel.app  
Backend API: https://team-task-manager-production-f970.up.railway.app

---

## Features

### Admin / Manager Panel
- Create and manage multiple project workspaces
- Add team members using registered email
- Assign tasks with:
  - title
  - description
  - submission deadline
  - priority level
- Monitor all assigned task progress
- Delete completed or invalid tasks
- Delete unnecessary projects

### Team Member Panel
- View all assigned tasks
- Track project workspace association
- View submission deadline
- Update execution status:
  - To Do
  - In Progress
  - Done

### Dashboard Analytics
- Total Projects
- Pending Deliveries
- Completed Deliveries
- Team Activity Monitoring

### Authentication
- Secure JWT based login/register
- Role based access (Admin / Member)

---

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Axios
- React Router DOM
- Lucide React Icons
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

### Deployment
- Frontend: Vercel
- Backend: Railway

---
 
### Backend Setup

cd backend  
npm install  
npm run server

### Frontend Setup

cd client/frontend  
npm install  
npm run dev

---

## Author

Akshun Jindal   
Full Stack Developer | MERN Stack Enthusiast

---

## Project Objective

This project was developed as a recruiter-focused full-stack assessment to demonstrate:
- backend architecture
- REST API integration
- role based authentication
- real-world CRUD workflows
- responsive dashboard UI
- production deployment handling

It simulates an internal company task execution system used by managers and employees for workflow coordination.
