import Joi, {string} from "joi";

const createSubtaskItemsSchema = Joi.object({
    title: Joi.string(),
    isChecked: Joi.boolean(),
})

const todoItemsSchema = Joi.object({
    title: Joi.string(),
    isChecked: Joi.boolean(),
    subtasks: Joi.array().items(createSubtaskItemsSchema),
})

const createToDoValidation = Joi.object({
    todo: Joi.array().items(todoItemsSchema),
    noteId: Joi.string().required(),
})

const subtaskSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string(),
    isChecked: Joi.boolean()
});

const todoItemSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string(),
    isChecked: Joi.boolean(),
    subtasks: Joi.array().items(subtaskSchema)
});

const updateToDoValidation = Joi.object({
    noteId: Joi.string().required(),
    todo: Joi.array().items(todoItemSchema).required()
});

const getToDoValidation = Joi.string().required()


const getToDoSubstaskValidation = Joi.object({
    todoId: Joi.string().required(),
    substaskId: Joi.string().required(),
})

export {
    createToDoValidation,
    updateToDoValidation,
    getToDoValidation,
    getToDoSubstaskValidation
}