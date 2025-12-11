# Secure File Hosting Web Application  
Course: COSC2956 – Internet Tools  
Final Project – Full Stack Implementation

## Overview
This project is a secure file hosting web application built using a Node.js/Express backend, MongoDB database, and a simple HTML/CSS/JavaScript frontend.  
Users can register, log in, upload files, view files they uploaded, delete files they own, and access publicly available downloads.  
All data is retrieved dynamically from the backend through REST API calls, with no hardcoded values.

---

## Features

### User Authentication
- Register with username, email, and password  
- Passwords are hashed using bcrypt  
- Login returns a JWT token  
- Token is stored in localStorage  
- Protected routes require a valid token  

### File Upload
- Upload PDF and MP4 files (max size: 20MB)  
- Files stored in the `/uploads` directory  
- File metadata stored in MongoDB  
- Privacy option: public or private  

### File Listing
- Public files page visible to all users  
- "My Files" page shows only the logged-in user's uploads  
- Users can delete only their own files  
- All file data loaded through API calls using fetch()  

### File Deletion
- Deletes database record and physical file  
- Only file owner can delete  

### Technologies Used
- Node.js / Express  
- MongoDB / Mongoose  
- HTML, CSS, JavaScript  
- JWT Authentication  
- Multer for file uploads  

---

## Backend Setup

### 1. Install Dependencies
Navigate to the backend folder and install required packages:

