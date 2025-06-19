import {
    createToDoValidation,
    getToDoSubstaskValidation,
    getToDoValidation,
    updateToDoValidation
} from "../validation/todo-validation.js";
import {validate} from "../validation/validate.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";

const notesOnDatabase = async (noteId) => {
    return prismaClient.note.findUnique({
        where: {
            id : noteId
        },
    })
}

const todoOnDatabase = async (todoId) => {
    return prismaClient.todo.findUnique({
        where: {
            id : todoId
        },
    })
}

const create = async (request) => {
    const data = validate(createToDoValidation, request);

    const checkNote = await notesOnDatabase(data.noteId)

    if (!checkNote) {
        throw new ResponseError(404, "Note not found");
    }

    const results = [];

    for (const todoItem of data.todo) {
        const createdTodo = await prismaClient.todo.create({
            data: {
                title: todoItem.title,
                is_checked: todoItem.isChecked,
                note: {
                    connect: { id: data.noteId }
                },
                subtasks: {
                    create: todoItem.subtasks.map((sub) => ({
                        title: sub.title,
                        is_checked: sub.isChecked,
                        note: {
                            connect: { id: data.noteId }
                        }
                    }))
                }
            },
            include: {
                subtasks: true
            }
        });

        results.push(createdTodo);
    }

    return results;
};

const update = async (request) => {
    const data = validate(updateToDoValidation, request);
    const { noteId, todo } = data;

    const checkNote = await notesOnDatabase(noteId)

    if (!checkNote) {
        throw new ResponseError(404, "Note not found");
    }

    const updated = [];

    for (const task of todo) {
        const updatedTodo = await prismaClient.todo.updateMany({
            where: {
                id: task.id,
                note_id: noteId
            },
            data: {
                title: task.title,
                is_checked: task.isChecked
            }
        });
        updated.push({ id: task.id, updatedTodo });

        for (const sub of task.subtasks || []) {
            const updatedSub = await prismaClient.todo.updateMany({
                where: {
                    id: sub.id,
                    note_id: noteId
                },
                data: {
                    title: sub.title,
                    is_checked: sub.isChecked
                }
            });

            updated.push({ id: sub.id, updatedSub });
        }
    }

    return updated;
};

const removeToDo = async (todoId) => {
    todoId = validate(getToDoValidation, todoId)

    const checkTodo = await todoOnDatabase(todoId)

    if (!checkTodo) {
        throw new ResponseError(404, "Todo not found");
    }

    const deleted = await prismaClient.todo.deleteMany({
        where: {
            OR: [
                { id: todoId },
                { subtask_id: todoId }
            ]
        }
    });

    return {
        message: 'Todo and its direct subtasks deleted',
        deletedCount: deleted.count
    };
};

const removeSubtask = async (request) => {
    const todo = validate(getToDoSubstaskValidation, request)
    const checkTodo = await todoOnDatabase(todo.todoId)

    if (!checkTodo) {
        throw new ResponseError(404, "Todo not found");
    }

    await prismaClient.todo.deleteMany({
        where: {
            id: todo.todoId,
            subtask_id: todo.substaskId
        },
    });

    return {
        message: 'Subtask deleted',
    };
};

const get = async (todoId) => {
    todoId = validate(getToDoValidation, todoId)

    const todo = await prismaClient.todo.findUnique({
        where: {
            id: todoId
        },
        include: {
            subtasks: true
        }
    });

    if (!todo) {
        throw new Error("Todo not found");
    }

    return todo;
}

export default {
    create,
    update,
    removeToDo,
    removeSubtask,
    get
}