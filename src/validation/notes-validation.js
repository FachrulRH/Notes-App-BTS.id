import Joi from "joi";

const createNotesValidation = Joi.object({
    title: Joi.string().required().max(255),
    userId: Joi.string().required(),
})

const updateNotesValidation = Joi.object({
    noteId: Joi.string().required(),
    userId: Joi.string().required(),
    title: Joi.string().max(255),
})

const getNotesValidation = Joi.object({
    noteId: Joi.string().required(),
    userId: Joi.string().required(),
})

export {
    createNotesValidation,
    updateNotesValidation,
    getNotesValidation
}