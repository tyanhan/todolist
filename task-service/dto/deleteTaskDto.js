import Joi from "joi";

export const deleteTaskSchema = Joi.object({
    description: Joi.string().required()
});
