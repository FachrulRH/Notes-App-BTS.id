import noteService from "../service/note-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;
        request.userId = req.user.id
        const result = await noteService.create(request);
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
        request.userId = req.user.id
        request.noteId = req.params.noteId
        const result = await noteService.update(request);
        res.status(200).send({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const userId = req.user.id
        const noteId = req.params.noteId
        await noteService.update({userId, noteId});
        res.status(200).send({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
}

const list = async (req, res, next) => {
    try {
        const userId = req.user.id
        const limit = req.query.limit
        const result = await noteService.list(limit, userId);
        res.status(200).send({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const userId = req.user.id
        const noteId = req.params.noteId
        const result = await noteService.get({userId, noteId});
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
    remove,
    list,
    get
}