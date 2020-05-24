import Joi from '@hapi/joi';

export default Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().optional().allow(''),
    lastName: Joi.string().optional().allow('')
}).options({
    abortEarly: false
});
