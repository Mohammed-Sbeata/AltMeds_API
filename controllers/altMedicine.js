const AltMedicine = require('../models');
const createError = require('http-errors');

// ➕ إنشاء دواء بديل
const createAltMedicine = (req, res, next) => {
    const { error } = AltMedicine.validate(req.body);
    if (error) return next(createError(400, error.message));

    const altMed = new AltMedicine(req.body);
    altMed.save((status) => {
        if (status.status) {
            res.status(201).json({
                status: true,
                message: 'تمت إضافة الدواء البديل بنجاح',
                id: status._id
            });
        } else {
            next(createError(500, status.message));
        }
    });
};

// 📄 عرض كل الأدوية البديلة
const getAllAltMedicines = (req, res, next) => {
    AltMedicine.getAll()
        .then(data => res.status(200).json(data))
        .catch(err => next(createError(500, err.message)));
};

// 📄 عرض دواء بديل حسب ID
const getAltMedicineById = (req, res, next) => {
    const id = req.params.id;

    AltMedicine.getById(id)
        .then(data => {
            if (!data) return next(createError(404, 'الدواء البديل غير موجود'));
            res.status(200).json(data);
        })
        .catch(err => next(createError(500, err.message)));
};

// ✏️ تعديل دواء بديل
const updateAltMedicine = (req, res, next) => {
    const id = req.params.id;
    const { error } = AltMedicine.validate(req.body);
    if (error) return next(createError(400, error.message));

    AltMedicine.update(id, req.body)
        .then(result => {
            if (!result.modified) return next(createError(404, 'الدواء البديل غير موجود أو لم يتم التعديل'));
            res.status(200).json({ status: true, message: 'تم التعديل بنجاح' });
        })
        .catch(err => next(createError(500, err.message)));
};

// 🗑️ حذف دواء بديل
const deleteAltMedicine = (req, res, next) => {
    const id = req.params.id;

    AltMedicine.delete(id)
        .then(result => {
            if (!result.deleted) return next(createError(404, 'الدواء البديل غير موجود'));
            res.status(200).json({ status: true, message: 'تم الحذف بنجاح' });
        })
        .catch(err => next(createError(500, err.message)));
};

module.exports = {
    createAltMedicine,
    getAllAltMedicines,
    getAltMedicineById,
    updateAltMedicine,
    deleteAltMedicine
};
