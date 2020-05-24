import Joi from '@hapi/joi';

export default Joi.object({
    password: Joi.string().optional().allow(''),
    firstName: Joi.string().optional().allow(''),
    lastName: Joi.string().optional().allow(''),
    countryCode: Joi.string().regex(/^\d+$/).optional().min(1).max(3).allow(''),
    phoneNumber: Joi.string().regex(/^\d+$/).min(10).max(12).allow('')
}).options({
    abortEarly: false
});
