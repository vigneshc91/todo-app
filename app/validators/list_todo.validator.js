import Joi from '@hapi/joi';
import { Label, Status } from '../models/todo.model';

const label = Joi.number().valid(...Object.values(Label));
const status = Joi.number().valid(Status.NEW, Status.INPROGRESS, Status.COMPLETED);
const sort = ['createdAt', '-createdAt', 'updatedAt', '-updatedAt', 'title', '-title', 'label', '-label', 'status', '-status'];

export default Joi.object({
    search: Joi.string().optional().allow(''),
    dueDate: Joi.date().iso().optional().allow(''),
    label: Joi.alternatives().try(Joi.array().items(label), label).optional().allow(''),
    status: Joi.alternatives().try(Joi.array().items(status), status).optional().allow(''),
    sort: Joi.string().valid(...sort).optional().allow(''),
    skip: Joi.number().optional().allow(''),
    size: Joi.number().optional().allow(''),
    all: Joi.bool().optional().allow('')
}).options({
    abortEarly: false
});
