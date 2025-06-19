const createError = require('http-errors');
const Medicine = require('../models/medicine');
const { ObjectId } = require('bson');

// ➕ إضافة دواء مفقود
const createMedicine = (req, res, next) => {
    const validation = Medicine.validate(req.body);
    if (validation.error) {
        return next(createError(400, validation.error.message));
    }

    const medicine = new Medicine(req.body);
    medicine.save((status) => {
        if (status.status) {
            res.status(201).json({
                status: true,
                _id: status._id,
                message: 'Medicine added successfully.'
            });
        } else {
            next(createError(500, status.message));
        }
    });
};

// 📄 جلب كل الأدوية المفقودة
const getAllMedicines = (req, res, next) => {
    Medicine.getAll()
        .then(medicines => {
            res.status(200).json(medicines);
        })
        .catch(err => next(createError(500, err.message)));
};

// 📄 جلب دواء مفقود حسب ID
const getMedicineById = (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return next(createError(400, 'Invalid medicine ID'));
    }

    Medicine.getById(id)
        .then(medicine => {
            if (!medicine) return next(createError(404, 'Medicine not found'));
            res.status(200).json(medicine);
        })
        .catch(err => next(createError(500, err.message)));
};

// ✏️ تعديل دواء مفقود
const updateMedicine = (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return next(createError(400, 'Invalid medicine ID'));
    }

    const validation = Medicine.validate(req.body);
    if (validation.error) {
        return next(createError(400, validation.error.message));
    }

    Medicine.update(id, req.body)
        .then(result => {
            if (!result.modified) {
                return next(createError(404, 'Medicine not found or no changes made'));
            }
            res.status(200).json({ status: true, message: 'Medicine updated successfully' });
        })
        .catch(err => next(createError(500, err.message)));
};

// 🗑️ حذف دواء مفقود
const deleteMedicine = (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return next(createError(400, 'Invalid medicine ID'));
    }

    Medicine.delete(id)
        .then(result => {
            if (!result.deleted) {
                return next(createError(404, 'Medicine not found'));
            }
            res.status(200).json({ status: true, message: 'Medicine deleted successfully' });
        })
        .catch(err => next(createError(500, err.message)));
};

module.exports = {
    createMedicine,
    getAllMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine
};
