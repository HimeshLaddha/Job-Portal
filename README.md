# Job Portal Application

A full-stack Job Portal application built with the MERN stack (MongoDB, Express, React, Node.js), featuring authentication with Clerk, file uploads with Cloudinary, and error monitoring with Sentry.

## 🚀 Features

- **User Authentication**: Secure signup and login for job seekers and recruiters using [Clerk](https://clerk.com/).
- **Job Management**: Recruiters can post, update, and manage job listings.
- **Job Search**: Candidates can browse and search for jobs with filtering options.
- **File Uploads**: Resume and image uploads handled via [Cloudinary](https://cloudinary.com/).
- **Rich Text Editor**: Integrated Quill editor for detailed job descriptions.
- **Error Monitoring**: Real-time error tracking with [Sentry](https://sentry.io/).
- **Email Notifications**: Automated updates for application status (via backend logic).

## � Folder Structure

The project is organized into two main directories: `client` (Frontend) and `server` (Backend).

```
Job-Portal/
├── client/                 # Frontend (React + Vite)
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── assets/         # Images and icons
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context (Global State)
│   │   ├── pages/          # Application Views/Routes
│   │   ├── App.jsx         # Main App Component
│   │   ├── main.jsx        # Entry Point
│   │   └── index.css       # Global Styles (Tailwind)
│   ├── .env                # Client Environment Variables
│   ├── index.html          # HTML Template
│   ├── package.json        # Client Dependencies
│   └── vite.config.js      # Vite Configuration
│
├── server/                 # Backend (Node.js + Express)
│   ├── config/             # DB, Cloudinary, & Instrument Configs
│   ├── controllers/        # Route Logic (Company, Job, User)
│   ├── middleware/         # Auth & Error Middleware
│   ├── models/             # Mongoose Schemas/Models
│   ├── routes/             # API Route Definitions
│   ├── utils/              # Helper Functions (Token Gen)
│   ├── .env                # Server Environment Variables
│   ├── package.json        # Server Dependencies
│   └── server.js           # Server Entry Point
└── README.md               # Project Documentation
```

## �🛠️ Tech Stack

### Client (Frontend)
- **Core**: React 19, Vite 7
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM 7
- **State Management**: Context API
- **HTTP Client**: Axios
- **UI Components**: React Toastify (Notifications), Quill (Rich Text Editor)
- **Utilities**: Moment.js, k-convert

### Server (Backend)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: Clerk (User/Auth Management), JSON Web Token (Company Auth)
- **File Storage**: Cloudinary (Multer for parsing)
- **Validation/Webhooks**: Svix (Clerk Webhooks)
- **Monitoring**: Sentry
- **Security**: CORS, Bcrypt (Password Hashing)

## 📡 API Endpoints

### 🏢 Company Routes (`/api/company`)
| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new company account (with logo upload). | No |
| `POST` | `/login` | Authenticate and login a company. | No |
| `GET` | `/company` | Get logged-in company profile details. | **Yes** |
| `POST` | `/post-job` | Post a new job listing. | **Yes** |
| `GET` | `/applicants` | Get a list of applicants for posted jobs. | **Yes** |
| `GET` | `/list-jobs` | Get all jobs posted by the company. | **Yes** |
| `POST` | `/change-status` | Update the status of a job application. | **Yes** |
| `POST` | `/change-visibility`| Toggle visibility of a job post. | **Yes** |

### 💼 Job Routes (`/api/jobs`)
| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Fetch all available job listings. | No |
| `GET` | `/:id` | Fetch details of a specific job by ID. | No |

### 👤 User Routes (`/api/users`)
| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `GET` | `/user` | Get current user's profile data. | No (Auth via Clerk) |
| `POST` | `/apply` | Apply for a specific job. | No (Auth via Clerk) |
| `GET` | `/applications` | Get list of jobs the user has applied to. | No (Auth via Clerk) |
| `POST` | `/update-resume` | Upload or update user resume. | No (Auth via Clerk) |

> **Note**: User routes are secured using `clerkMiddleware` and `req.auth` context.

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Connection String
- Clerk Account (Publishable & Secret Keys)
- Cloudinary Account (Cloud Name, API Key, Secret)

### 1. Clone the Repository
```bash
git clone https://github.com/HimeshLaddha/job-portal.git
cd Job-Portal
```

### 2. Setup Server
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_for_company_auth

# Authentication (Clerk)
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# File Storage (Cloudinary)
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
```

Start the server:
```bash
npm run server
# or
npm start
```
The server will run on `http://localhost:5000`.

### 3. Setup Client
Navigate to the client directory and install dependencies:
```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```
The client will usually run on `http://localhost:5173`.

