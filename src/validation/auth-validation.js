import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().required().max(255),
    email: Joi.string().required().max(255),
    password: Joi.string().required().max(255),
    confirm_password: Joi.string().required().max(255),
})

const loginUserValidation = Joi.object({
    username: Joi.string().required().max(255),
    password: Joi.string().required().max(255),
})

const getUserValidation = Joi.object({
    user_id: Joi.string().max(100).required(),
    token: Joi.string().required()
})

const getTokenIdValidation = Joi.string().required()

export {
    getTokenIdValidation,
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
}