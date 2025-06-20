const Joi = require('@hapi/joi');

const medicineValidator = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Name Medicine is not empty',
            'string.min': 'Name Medicine is too Min',
            'string.max': 'Name Medicine is too Max'
        }),

    description: Joi.string()
        .max(1000)
        .allow('')
        .messages({
            'string.max': 'Description Medicine is too Max'
        })
});

module.exports = {
    medicineValidator
};
