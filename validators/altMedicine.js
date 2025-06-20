const Joi = require('@hapi/joi');

const altMedicineValidator = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.base': 'Name Medicine must be string',
            'string.empty': 'Name Medicine Not Empty',
            'string.min': 'Name Medicine is very Minimum',
            'string.max': 'Name Medicine is very Maximum',
            'any.required': 'Nmae Medicine is requiered'
        }),

    description: Joi.string()
        .max(1000)
        .allow('')
        .messages({
            'string.max': 'description is very Maximum'
        }),

    originalMedicineId: Joi.string()
        .required()
        .messages({
            'string.empty': 'PharmacyId is Not empty',
            'any.required': 'PharmacyId is requiered'
        }),

    pharmacyIds: Joi.array()
        .items(Joi.string())
        .min(1)
        .required()
        .messages({
            'array.base': 'Pharmacies must be Array',
            'array.min': 'Must be Select At Least one PharmacyId',
            'any.required': 'Must be Select At Least one AltMed PharmacyId'
        })
});

module.exports = {
    altMedicineValidator
};
