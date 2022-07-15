//Validation
const Joi = require('@hapi/joi');

//Register validation
const registerValidation = body => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(body, schema);
}

//login Validation
const loginValidation = body => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(body, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
