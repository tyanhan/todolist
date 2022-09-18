import Joi from "joi";

export const updateTaskSchema = Joi.object({
    oldDesc: Joi.string().required(),
    oldIsChecked: Joi.bool().required(),
    newDesc: Joi.string().required(),
    newIsChecked: Joi.bool().required(),
});
