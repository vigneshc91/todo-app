import Joi from '@hapi/joi';
import { Label } from '../models/todo.model';

export default Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional().allow(''),
    dueDate: Joi.date().iso().greater('now').optional().allow(''),
    label: Joi.number().valid(...Object.values(Label)).optional().allow('')
}).options({
    abortEarly: false
});
