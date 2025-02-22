# 👨‍💼 TaskFlow - Task Management System

## 📝 Short Description
TaskFlow is a simple and efficient task management system designed to help users organize, track, and manage their tasks with ease. Users can create, update, delete, and categorize their tasks dynamically, ensuring smooth workflow management.

---

## 🚀 Live Demo
🔗 [TaskFlow Live](#) *(https://my-task-flow-management.vercel.app)*

## 📁 Backend Repository

🔗 [TaskFlow Backend](#) *(https://github.com/ssmahim01/Task-Management-Backend)*

---

## 📦 Dependencies
```json
"dependencies": {
    <br>
    "@hello-pangea/dnd": "^18.0.1",
    <br>
    "@tailwindcss/vite": "^4.0.7",
    <br>
    "@tanstack/react-query": "^5.66.8",
    <br>
    "axios": "^1.7.9",
    <br>
    "firebase": "^11.3.1",
    <br>
    "react": "^19.0.0",
    <br>
    "react-dom": "^19.0.0",
    <br>
    "react-icons": "^5.5.0",
    <br>
    "react-router": "^7.2.0",
    <br>
    "react-router-dom": "^7.2.0",
    <br>
    "sweetalert2": "^11.17.2",
    <br>
    "tailwindcss": "^4.0.7"
    <br>
  }
  ```

  ---

## 🛠 Installation Steps
Follow these steps to set up the project locally:

### **1️⃣ Clone the Repository**
```sh
 git clone https://github.com/ssmahim01/Task-Management-With-React.git
 cd Task-Management-With-React
```

### **2️⃣ Install Dependencies**

```sh
 npm install
```
<br>

### **3️⃣ Set Up Environment Variables**
Create a `.env.local` file in the root directory and add:
```
VITE_apiKey="Your Firebase Api Key"
VITE_authDomain="Your Firebase Auth Domain"
VITE_projectId="Your Firebase Project Id"
VITE_storageBucket="Your Firebase Storage Bucket"
VITE_messagingSenderId="Your Firebase Messaging Sender Id"
VITE_appId="Your Firebase App Id"

VITE_BACKEND_URL=Your Backend URL(localhost or production URL)
```

### **4️⃣ Start the Frontend Development Server**

```sh
 npm run dev
```
---

## ⚙️ Technologies Used
- **Frontend:** React.js, Tailwind CSS, DaisyUI, React Router
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase Authentication
- **Hosting:** Netlify (Frontend), Render/Heroku (Backend)

---

## 🎯 Features
✅ User Authentication (Sign up/Login via Firebase)  
✅ Task CRUD operations (Create, Read, Update, Delete)  
✅ Drag and drop functionality for task reordering  
✅ Task categorization and indexing  
✅ Responsive UI with modern design

---

# Setup With React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
