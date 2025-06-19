import {prismaClient} from "../application/database.js";
import {validate} from "../validation/validate.js";
import {createNotesValidation, getNotesValidation, updateNotesValidation} from "../validation/notes-validation.js";
import {ResponseError} from "../error/response-error.js";

const userOnDatabase = async (userId) => {
    return prismaClient.users.findUnique({
        where: {
            id : userId
        },
    })
}

const notesOnDatabase = async (noteId) => {
    return prismaClient.note.findUnique({
        where: {
            id : noteId
        },
    })
}

const create = async (request) => {
    const note = validate(createNotesValidation, request);

    const checkUser = await userOnDatabase(note.userId)

    if (!checkUser) {
        throw new ResponseError(404, "User not found");
    }

    return prismaClient.note.create({
        data: {
            title: note.title,
            users: {
                connect: {id: note.userId}
            }
        },
        include: {
            todos: true
        }
    });
}

const update = async (request) => {
    const note = validate(updateNotesValidation, request);

    const checkUser = await userOnDatabase(note.userId)

    if (!checkUser) {
        throw new ResponseError(404, "User not found");
    }

    const checkNote = await notesOnDatabase(note.noteId)

    if (!checkNote) {
        throw new ResponseError(404, "Note not found");
    }

    return prismaClient.note.update({
        where: {
            id: note.noteId,
        },
        data: {
            title: note.title,
        },
        select: {
            id: true,
            user_id: true,
            created_at: true,
            updated_at: true,
            title: true,
        }
    });
}

const remove = async (request) => {
    const note = validate(getNotesValidation, request);

    const checkUser = await userOnDatabase(note.userId)

    if (!checkUser) {
        throw new ResponseError(404, "User not found");
    }

    const checkNote = await notesOnDatabase(note.noteId)

    if (!checkNote) {
        throw new ResponseError(404, "Note not found");
    }

    return prismaClient.note.delete({
        where: {
            id: note.noteId,
        }
    });
}

const list = async (limit = 10, userId) => {

    const checkUser = await userOnDatabase(userId)

    if (!checkUser) {
        throw new ResponseError(404, "User not found");
    }

    return prismaClient.note.findMany({
        where: {
            user_id: userId,
        },
        take: limit,
        include: {
            todos: true
        }
    });
}

const get = async (request) => {
    const note = validate(getNotesValidation, request);

    const checkUser = await userOnDatabase(note.userId)

    if (!checkUser) {
        throw new ResponseError(404, "User not found");
    }

    const checkNote = await notesOnDatabase(note.noteId)

    if (!checkNote) {
        throw new ResponseError(404, "Note not found");
    }

    return prismaClient.note.findFirst({
        where: {
            id: note.noteId,
            user_id: note.userId
        },
        include: {
            todos: {
                include: {
                    subtasks: true
                }
            }
        }
    });
}

export default {
    create,
    update,
    remove,
    list,
    get
}