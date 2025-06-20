const Joi = require('@hapi/joi');

const pharmacyValidator = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Name Pharmacy is not empty',
            'string.min': 'Name Pharmacy is too Min',
            'string.max': 'Name Pharmacy is too Max'
        }),

    address: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty':'Pharmacy Address is not empty',
            'string.min': 'Pharmacy Address is too Min',
            'string.max': 'Pharmacy Address is too Max'
        }),

    phone: Joi.string()
        .pattern(/^[0-9+\-\s]{6,20}$/)
        .optional()
        .messages({
            'string.pattern.base': 'Phone Number is InValid'
        })
});

module.exports = {
    pharmacyValidator
};
