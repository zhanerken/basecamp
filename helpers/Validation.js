const Joi = require('@hapi/joi');

const UserValidationSchema = Joi.object({
    name : Joi
        .string()
        .min(2)
        .max(10)
        .alphanum(),
    email : Joi
        .string()
        .email()
        .max(30)
        .min(5),
    password : Joi
        .string()
        .min(6)
        .max(100)        
})

const AuthUserValidationSchema = Joi.object({
    email : Joi
        .string()
        .email()
        .max(30)
        .min(5),
    password : Joi
        .string()
        .min(6)
        .max(100)        
})

module.exports = {
    UserValidationSchema,
    AuthUserValidationSchema
}