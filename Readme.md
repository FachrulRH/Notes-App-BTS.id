# 📝 Notes App API

A RESTful API for managing user-created notes and nested to-do lists built with **Node.js**, **Express**, **Prisma**, and **MySQL**.
this app for Fulfilled Technical Test at BTS.id
---

## 🚀 Features

- ✅ User registration and login with JWT
- ✅ Create, update, delete notes
- ✅ Each note has nested to-do items
- ✅ Todos support unlimited subtasks
- ✅ Input validation using Joi
- ✅ Secure route handling with authorization
- ✅ Automated tests with Jest & Supertest

---

## 🛠️ Tech Stack

- **Node.js** + **Express**
- **Prisma ORM** + **MySQL**
- **Joi** for validation
- **Supertest** for integration testing
- **Makrdown**  for API documentation [Click this to see Documentation](https://github.com/FachrulRH/Notes-App-BTS.id/tree/master/documentation)

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/notes-app.git
cd notes-app
npm install
```

## 🔧 Installation

Create an .env file :
```bash
DATABASE_URL="mysql://user:password@127.0.0.1:3306/notes_app_bts"
JWT_SECRET="your_jwt_secret"
JWT_REFRESH_SECRET="your_jwt_secret_refresh"
PORT=3000
```

## 🧪 Run Test

```bash
npm run test
```
