import {prismaClient} from "../../src/application/database.js";

export const createTestTodo = async () => {

    return prismaClient.todo.create({
        data: {
            id: "testtodo1",
            title: "your todo",
            is_checked: false,
            note: { connect: { id: "testnote" } },
            subtasks: {
                create: [
                    {
                        id: "testsubtask1",
                        title: "Write Docs",
                        is_checked: true,
                        note: {
                            connect: { id: "testnote" }
                        },
                    }
                ]
            }
        },
        include: {
            subtasks: true
        }
    })
}

export const removeTestToDo = async () => {
    await prismaClient.todo.deleteMany({})
}

export const todoData = async () => {
    return {
        todo: [
            {
                title: "Updated Todo 1",
                isChecked: true,
                subtasks: [
                    { title: "Subtask 1", isChecked: false },
                    { title: "Subtask 2", isChecked: true }
                ]
            },
            {
                title: "Updated Todo 2",
                isChecked: false,
                subtasks: [
                    { title: "Subtask A", isChecked: true }
                ]
            }
        ]
    }
}

export const todoDataUpdate = async () => {
    return {
        todo: [
            {
                id: "testtodo1",
                title: "Updated Todo 1",
                isChecked: true,
                subtasks: [
                    { id: "testsubtask1", title: "Subtask 1", isChecked: false },
                ]
            },
        ]
    }
}