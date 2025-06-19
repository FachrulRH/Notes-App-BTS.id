
import todoService from "../service/todo-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;
        request.noteId = req.params.noteId;
        const result = await todoService.create(request);
        res.status(200).send({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const request = req.body;
        request.noteId = req.params.noteId;
        const result = await todoService.update(request);
        res.status(200).send({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const removeTodo = async (req, res, next) => {
    try {
        const todoId = req.params.todoId;
        const result = await todoService.removeToDo(todoId);
        res.status(200).send({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const removeSubtask = async (req, res, next) => {
    try {
        const substaskId = req.params.substaskId;
        const todoId = req.params.todoId;
        const result = await todoService.removeSubtask({todoId, substaskId});
        res.status(200).send({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const todoId = req.params.todoId;
        const result = await todoService.get(todoId);
        res.status(200).send({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    update,
    removeTodo,
    removeSubtask,
    get
}