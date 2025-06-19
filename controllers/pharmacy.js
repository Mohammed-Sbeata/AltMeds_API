const createError = require('http-errors');
const Pharmacy = require('../models/pharmacy');
const { ObjectId } = require('bson');

const createPharmacy = (req, res, next) => {
    const validation = Pharmacy.validate(req.body);
    if (validation.error) {
        return next(createError(400, validation.error.message));
    }

    const pharmacy = new Pharmacy(req.body);
    pharmacy.save((status) => {
        if (status.status) {
            res.status(201).json({
                status: true,
                _id: status._id,
                message: 'Pharmacy added successfully.'
            });
        } else {
            next(createError(500, status.message));
        }
    });
};

const getAllPharmacies = (req, res, next) => {
    Pharmacy.getAll()
        .then(pharmacies => {
            res.status(200).json(pharmacies);
        })
        .catch(err => {
            next(createError(500, err.message));
        });
};

const getPharmacyById = (req, res, next) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return next(createError(400, 'Invalid pharmacy ID'));
    }

    Pharmacy.getById(id)
        .then(pharmacy => {
            if (!pharmacy) return next(createError(404, 'Pharmacy not found'));
            res.status(200).json(pharmacy);
        })
        .catch(err => next(createError(500, err.message)));
};

const updatePharmacy = (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return next(createError(400, 'Invalid pharmacy ID'));
    }

    const validation = Pharmacy.validate(req.body);
    if (validation.error) {
        return next(createError(400, validation.error.message));
    }

    Pharmacy.update(id, req.body)
        .then(result => {
            if (!result.modified) {
                return next(createError(404, 'Pharmacy not found or no changes made'));
            }
            res.status(200).json({ status: true, message: 'Pharmacy updated successfully' });
        })
        .catch(err => next(createError(500, err.message)));
};

// 🗑️ حذف صيدلية
const deletePharmacy = (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return next(createError(400, 'Invalid pharmacy ID'));
    }

    Pharmacy.delete(id)
        .then(result => {
            if (!result.deleted) {
                return next(createError(404, 'Pharmacy not found'));
            }
            res.status(200).json({ status: true, message: 'Pharmacy deleted successfully' });
        })
        .catch(err => next(createError(500, err.message)));
};

module.exports = {
    createPharmacy,
    getAllPharmacies,
    getPharmacyById,
    updatePharmacy,
    deletePharmacy
};
