import Joi from "joi";

export const addTaskSchema = Joi.object({
    description: Joi.string().required(),
    isChecked: Joi.bool().required()
});
