const Joi = require('@hapi/joi');

const altMedicineValidator = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.base': 'اسم الدواء يجب أن يكون نصاً',
            'string.empty': 'اسم الدواء مطلوب',
            'string.min': 'اسم الدواء قصير جداً',
            'string.max': 'اسم الدواء طويل جداً',
            'any.required': 'اسم الدواء مطلوب'
        }),

    description: Joi.string()
        .max(1000)
        .allow('')
        .messages({
            'string.max': 'الوصف طويل جداً'
        }),

    originalMedicineId: Joi.string()
        .required()
        .messages({
            'string.empty': 'رقم تعريف الدواء الأصلي مطلوب',
            'any.required': 'رقم تعريف الدواء الأصلي مطلوب'
        }),

    pharmacyIds: Joi.array()
        .items(Joi.string())
        .min(1)
        .required()
        .messages({
            'array.base': 'قائمة الصيدليات يجب أن تكون مصفوفة',
            'array.min': 'يجب تحديد صيدلية واحدة على الأقل',
            'any.required': 'يجب تحديد صيدليات توفر الدواء البديل'
        })
});

module.exports = {
    altMedicineValidator
};
