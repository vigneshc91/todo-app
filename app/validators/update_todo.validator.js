import Joi from '@hapi/joi';
import { Label, Status } from '../models/todo.model';

export default Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional().allow(''),
    dueDate: Joi.date().iso().greater('now').optional().allow(''),
    label: Joi.number().valid(...Object.values(Label)).optional().allow(''),
    status: Joi.number().valid(Status.NEW, Status.INPROGRESS, Status.COMPLETED).optional().allow('')
}).options({
    abortEarly: false
});
