import express from "express";
import authController from "../controller/auth-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";
import noteController from "../controller/note-controller.js";
import todoController from "../controller/todo-controller.js";

const usersRouter = new express.Router();

// Auth API
usersRouter.get('/api/users/current', authMiddleware, authController.get)
usersRouter.delete('/api/users/logout', authMiddleware, authController.logout)
usersRouter.put('/api/users/refresh', authMiddleware, authController.refresh)

// Notes API
usersRouter.post('/api/users/note/create', authMiddleware, noteController.create)
usersRouter.put('/api/users/note/update/:noteId', authMiddleware, noteController.update)
usersRouter.delete('/api/users/note/remove/:noteId', authMiddleware, noteController.remove)
usersRouter.get('/api/users/note', authMiddleware, noteController.list)
usersRouter.get('/api/users/note/:noteId', authMiddleware, noteController.get)

// Todo API
usersRouter.post('/api/users/todo/create/:noteId', authMiddleware, todoController.create)
usersRouter.put('/api/users/todo/update/:noteId', authMiddleware, todoController.update)
usersRouter.delete('/api/users/todo/remove/:todoId', authMiddleware, todoController.removeTodo)
usersRouter.delete('/api/users/todo/:todoId/substask/remove/:substaskId', authMiddleware, todoController.removeSubtask)
usersRouter.get('/api/users/todo/:todoId', authMiddleware, todoController.get)

export {
    usersRouter
}