Secure File Hosting Web Application

Course: COSC2956 – Internet Tools
Final Project – Full Stack Implementation

Overview

This project is a secure file hosting web application built using a Node.js/Express backend, MongoDB database, and a simple HTML/CSS/JavaScript frontend.
Users can register, log in, upload files, view their uploaded files, delete files, and access publicly available downloads.
All data is fully dynamic and retrieved from the backend using REST APIs.

Features
User Authentication

Register with username, email, and password

Passwords hashed using bcrypt

Login returns a JWT token

Token stored in localStorage on the frontend

Protected routes require valid token

File Upload

Upload PDF and MP4 files (max size: 20MB)

Files stored in the /uploads directory

Metadata saved to MongoDB

User chooses privacy (public or private)

File Listing

Public files: visible to all users

My Files: only logged-in user can view their uploads

Files displayed dynamically using fetch()

Users can delete only their own files

File Deletion

Deletes file from database and actual file system

Requires authentication and ownership verification

Technologies Used

Node.js / Express

MongoDB / Mongoose

HTML, CSS, JavaScript

JWT authentication

Multer for file upload handling

Backend Setup
1. Install Dependencies

Navigate to the backend folder and install the required packages:

cd backend
npm install

2. Create Environment File

Inside backend, create a .env file:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/securefilehosting
JWT_SECRET=your_secret_key_here

3. Start the Backend Server
npm run dev


The server should run on:

http://localhost:5000

Frontend Setup
1. Open the Frontend Folder

Go to:

frontend/

2. Open HTML pages in browser

You can open any page directly, for example:

register.html
login.html
upload.html
myfiles.html
downloads.html


No build tools or frameworks are required.

API Endpoints
Authentication

POST /api/register – Register new user

POST /api/login – Login and receive JWT token

File Operations

POST /api/upload – Upload a file (requires token)

GET /api/my-files – Fetch files uploaded by logged-in user

GET /api/public-files – Fetch all public files

DELETE /api/files/:id – Delete a file (owner only)

Folder Structure
/backend
    server.js
    /controllers
    /routes
    /middleware
    /models
    /uploads
/frontend
    *.html
    scripts.js
    styles.css
README.md

How to Run the Full Application

Start backend using npm run dev.

Open frontend pages in the browser from the frontend folder.

Register → Login → Upload → View Files → Delete or Download.

Notes

No hardcoded data is used; all information is stored in MongoDB.

Only PDF and MP4 uploads are accepted.

File deletion removes both the database entry and physical file.

JWT tokens must be included in Authorization headers for protected routes.