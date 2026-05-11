# 🚀 Hire Back

Hire Back is a modern reverse job marketplace built using the MERN stack where companies compete to hire developers instead of developers applying for jobs.

Developers can create professional profiles, upload portfolios, resumes, project images, and receive interview requests from companies in real-time.

---

# 🌟 Features

## 👨‍💻 Developer Features

* Create and update developer profile
* Upload profile image
* Add multiple portfolio projects
* Upload resume (PDF)
* Add skills and experience
* Set expected salary
* Availability status
* Receive interview requests
* Accept / Reject interview requests
* Real-time notifications

---

## 🏢 Company Features

* Create company account
* Search developers
* Filter developers by:

  * Skills
  * Experience
  * Salary
* View public developer profiles
* Send interview requests
* Receive real-time updates

---

## 🔔 Real-Time Notification System

* Instant interview request alerts
* Real-time accept/reject updates
* Notification badge
* Toast notifications
* Socket.IO integration

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Socket.IO Client
* React Hot Toast

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js
* Socket.IO
* Multer
* Cloudinary

---

# 📁 Project Structure

```bash
Hire Back/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── socket.js
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── hire-back-server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket.js
│   ├── server.js
│   └── package.json
```

---

# 🔐 Authentication

* JWT-based authentication
* Role-based access control
* Developer & Company roles
* Protected APIs
* Password hashing using bcrypt

---

# 🗄️ Database Models

## User

```js
{
  name,
  email,
  password,
  role
}
```

---

## DeveloperProfile

```js
{
  userId,
  skills,
  experience,
  expectedSalary,
  availability,
  profileImage,
  resume,
  projects,
  profileViews
}
```

---

## CompanyProfile

```js
{
  userId,
  companyName,
  industry,
  location
}
```

---

## InterviewRequest

```js
{
  companyId,
  developerId,
  message,
  status
}
```

---

## Notification

```js
{
  userId,
  message,
  type,
  isRead
}
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/hire-back.git
```

---

# 🚀 Backend Setup

## 2️⃣ Go to backend folder

```bash
cd hire-back-server
```

---

## 3️⃣ Install dependencies

```bash
npm install
```

---

## 4️⃣ Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
```

---

## 5️⃣ Start backend

```bash
npm run dev
```

---

# 🎨 Frontend Setup

## 6️⃣ Go to frontend

```bash
cd frontend
```

---

## 7️⃣ Install dependencies

```bash
npm install
```

---

## 8️⃣ Start frontend

```bash
npm run dev
```

---

# 🔌 API Routes

## 🔐 Auth APIs

| Method | Route              |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

---

## 👨‍💻 Developer APIs

| Method | Route                         |
| ------ | ----------------------------- |
| GET    | /api/developer/profile        |
| POST   | /api/developer/profile        |
| GET    | /api/developer/public/:userId |
| GET    | /api/developer/requests       |

---

## 🏢 Company APIs

| Method | Route                   |
| ------ | ----------------------- |
| GET    | /api/company/developers |
| POST   | /api/company/profile    |
| GET    | /api/company/profile    |

---

## 📩 Interview APIs

| Method | Route                  |
| ------ | ---------------------- |
| POST   | /api/interview/send    |
| PUT    | /api/interview/respond |
| GET    | /api/interview/all     |

---

## 🔔 Notification APIs

| Method | Route                  |
| ------ | ---------------------- |
| GET    | /api/notifications     |
| PUT    | /api/notifications/:id |

---

# ☁️ Cloudinary Uploads

The application uses Cloudinary for:

* Profile image uploads
* Project image uploads
* Resume uploads

---

# ⚡ Real-Time Features

Using Socket.IO:

* Live notifications
* Instant interview request alerts
* Real-time accept/reject updates
* Notification badge updates

---

# 🎨 UI Design

* Fully responsive design
* Modern glassmorphism UI
* Tailwind CSS styling
* Soft blue theme (#85C1E9)
* Smooth animations
* Premium dashboard layouts

---

# 🚀 Future Improvements

* Video interview scheduling
* Chat system
* AI developer matching
* Resume analysis
* Bookmark developers
* Online/offline status
* Dark futuristic theme
* Admin dashboard

---

# 📸 Screenshots

Add screenshots of:

* Landing page
* Developer dashboard
* Company dashboard
* Public profile page
* Notifications system

---

# 👨‍💻 Author

Karan Sharma

---

# ⭐ Support

If you like this project:

* Star the repository
* Fork the project
* Share feedback

---

# 📜 License

This project is licensed under the MIT License.
