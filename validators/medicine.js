const Joi = require('@hapi/joi');

const medicineValidator = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'اسم الدواء مطلوب',
            'string.min': 'اسم الدواء قصير جدًا',
            'string.max': 'اسم الدواء طويل جدًا'
        }),

    description: Joi.string()
        .max(1000)
        .allow('')
        .messages({
            'string.max': 'الوصف طويل جدًا'
        })
});

module.exports = {
    medicineValidator
};
