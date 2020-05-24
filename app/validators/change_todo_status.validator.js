import Joi from '@hapi/joi';
import { Status } from '../models/todo.model';

export default Joi.object({
    status: Joi.number().valid(Status.NEW, Status.INPROGRESS, Status.COMPLETED).required()
}).options({
    abortEarly: false
});
