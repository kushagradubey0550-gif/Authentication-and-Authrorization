# Project 1 — Authentication & Authorization System

A beginner-friendly backend project built with **Node.js, Express.js, MongoDB, Mongoose, EJS, bcrypt, and express-session**.

This project was created to learn how authentication, sessions, roles, ownership, and CRUD operations work together in a real Express application.

## 🚀 Features

### Authentication

* User registration
* Password hashing with bcrypt
* Login with email and password
* Session-based authentication
* Logout
* Protected routes

### Authorization

* User and Admin roles
* Admin access control
* Ownership-based authorization
* Users can edit/delete their own posts
* Admins can edit/delete any user's post

### User Profile

* View username, email, and role
* Normal users can update their username

### Posts

* Create posts
* View posts
* Edit posts
* Delete posts
* Associate every post with its creator

## 🛠️ Technologies Used

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **EJS**
* **bcrypt**
* **express-session**
* **HTML & CSS**

## 📁 Project Structure

```text
Project_1/
│
├── models/
│   ├── user.js
│   └── post.js
│
├── views/
│   ├── register.ejs
│   ├── login.ejs
│   ├── profile.ejs
│   ├── create.ejs
│   ├── edit.ejs
│   └── edit-profile.ejs
│
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## 🔐 Authorization Logic

The project uses two main authorization concepts.

### Role-based authorization

Admins have additional permissions:

```text
Admin
├── Create posts
├── Edit any post
└── Delete any post
```

### Ownership-based authorization

Normal users can only modify posts they own:

```text
User A
├── Edit own post     ✅
├── Delete own post   ✅
├── Edit User B post  ❌
└── Delete User B post ❌
```

This is handled by comparing the post owner's `userId` with the currently logged-in user's session ID.

## 🧠 What I Learned

This project helped me understand:

* How Express routes work
* How MongoDB and Mongoose work
* How passwords are hashed with bcrypt
* How sessions remember logged-in users
* Authentication vs authorization
* Role-based authorization
* Ownership-based authorization
* CRUD operations
* How EJS receives and displays backend data
* How users and posts are connected using MongoDB ObjectIds

## ⚙️ Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Go into the project directory:

```bash
cd Project_1
```

Install dependencies:

```bash
npm install
```

Make sure MongoDB is running locally.

The application currently uses:

```text
mongodb://127.0.0.1:27017/Project_1
```

Start the server:

```bash
node app.js
```

Then open:

```text
http://localhost:3000
```

## 👤 User Roles

Newly registered users receive the default role:

```text
user
```

An administrator can be assigned by changing the user's role in the database to:

```text
admin
```

## ⚠️ Note

This project was built primarily as a **learning project** to understand authentication, authorization, sessions, and CRUD operations with Express and MongoDB.

It is not intended to represent a fully production-ready authentication system.

## 📌 Future Improvements

Possible improvements for a future version:

* Input validation
* Better error handling
* Environment variables
* Improved session security
* Password reset
* Stronger password requirements
* CSRF protection
* Rate limiting
* Better UI/UX

---

**Project 1 — Authentication & Authorization System**
Built while learning backend development with Node.js and Express.
