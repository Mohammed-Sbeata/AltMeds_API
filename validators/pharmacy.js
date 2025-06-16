const Joi = require('@hapi/joi');

const pharmacyValidator = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'اسم الصيدلية مطلوب',
            'string.min': 'اسم الصيدلية قصير جدًا',
            'string.max': 'اسم الصيدلية طويل جدًا'
        }),

    address: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': 'العنوان مطلوب',
            'string.min': 'العنوان قصير جدًا',
            'string.max': 'العنوان طويل جدًا'
        }),

    phone: Joi.string()
        .pattern(/^[0-9+\-\s]{6,20}$/)
        .optional()
        .messages({
            'string.pattern.base': 'رقم الهاتف غير صالح'
        })
});

module.exports = {
    pharmacyValidator
};
