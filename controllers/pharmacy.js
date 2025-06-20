const createError = require('http-errors');
const {Pharmacy} = require('../models');
const { ObjectId } = require('bson');

const createPharmacy = (req, res, next) => {
    const { error } = Pharmacy.validate(req.body);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    const pharmacy = new Pharmacy(req.body);
    pharmacy.save((status) => {
        if (status.status) {
            res.status(201).json({
                status: true,
                _id: status._id,
                message: 'Pharmacy Added Seccessfully ...'
            });
        } else {
            next(createError(500, status.message));
        }
    });
};

const getAllPharmacies = async (req, res, next) => {
    try {
        const pharmacies = await Pharmacy.getAll();
        res.status(200).json(pharmacies);
    } catch (err) {
        next(createError(500, err.message));
    }
};

// 📥 جلب صيدلية حسب ID
const getPharmacyById = async (req, res, next) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return next(createError(400, 'Pharmacy Id Not Corrcet'));
    }

    try {
        const pharmacy = await Pharmacy.getById(id);
        if (!pharmacy) return next(createError(404, 'Pharmacy is Not Exist...'));
        res.status(200).json(pharmacy);
    } catch (err) {
        next(createError(500, err.message));
    }
};

const updatePharmacy = async (req, res, next) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return next(createError(400, 'Pharmacy Id Not Corrcet'));
    }

    const { error } = Pharmacy.validate(req.body);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    try {
        const result = await Pharmacy.update(id, req.body);
        if (!result.modified) {
            return next(createError(404, 'Pharmacy is Not Exist Or Not Updated...'));
        }

        res.status(200).json({ status: true, message: 'Pharmacy Updated Successfully' });
    } catch (err) {
        next(createError(500, err.message));
    }
};

const deletePharmacy = async (req, res, next) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return next(createError(400, 'Pharmacy Id Not Corrcet'));
    }

    try {
        const result = await Pharmacy.delete(id);
        if (!result.deleted) {
            return next(createError(404, 'Pharmacy is Not Exist ...'));
        }

        res.status(200).json({ status: true, message: 'Pharmacy Deleted Successfully' });
    } catch (err) {
        next(createError(500, err.message));
    }
};

module.exports = {
    createPharmacy,
    getAllPharmacies,
    getPharmacyById,
    updatePharmacy,
    deletePharmacy
};
