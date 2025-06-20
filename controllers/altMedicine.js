const {altMedicine, Medicine, Pharmacy}= require('../models');
const createError = require('http-errors');

const createAltMedicine = async (req, res, next) => {
    const { error } = altMedicine.validate(req.body);
    if (error) return next(createError(400, error.message));

    const altMed = new altMedicine(req.body);
    const originalMedId = await Medicine.getById(req.body.originalMedicineId)
    if(!originalMedId) {
        return res.status(400).json({status:false,message:"This medicine is not exists"})
    }

    for(let i = 0; i < req.body.pharmacyIds.length; i++) {
        const id = await Pharmacy.getById(req.body.pharmacyIds[i])
        if(!id) {
            return res.status(400).json({status:false,message:"There one pharmacy at least not exists"})
        }
    }
    
    altMed.save((status) => {
        if (status.status) {
            res.status(201).json({
                status: true,
                message: 'Alt_Medicine Added Sucsessfully...',
                id: status._id
            });
        } else {
            next(createError(500, status.message));
        }
    });
};

const getAllAltMedicines = (req, res, next) => {
    altMedicine.getAll()
        .then(data => res.status(200).json(data))
        .catch(err => next(createError(500, err.message)));
};

const getAltMedicineById = (req, res, next) => {
    const id = req.params.id;

    altMedicine.getById(id)
        .then(data => {
            if (!data) return next(createError(404, 'Alt_Medicine is not Exists...'));
            res.status(200).json(data);
        })
        .catch(err => next(createError(500, err.message)));
};

const updateAltMedicine = async (req, res, next) => {
    const id = req.params.id;
    const { error } = altMedicine.validate(req.body);
    if (error) return next(createError(400, error.message));

    const originalMedId = await Medicine.getById(req.body.originalMedicineId)
    if(!originalMedId) {
        return res.status(400).json({status:false,message:"This medicine is not exists"})
    }

    for(let i = 0; i < req.body.pharmacyIds.length; i++) {
        const id = await Pharmacy.getById(req.body.pharmacyIds[i])
        if(!id) {
            return res.status(400).json({status:false,message:"There one pharmacy at least not exists"})
        }
    }


    altMedicine.update(id, req.body)
        .then(result => {
            if (!result.modified) return next(createError(404, 'Alt_Medicine is not Exists Or Not Updated...'));
            res.status(200).json({ status: true, message: 'Alt_Medicine Updated Sucsessfully...' });
        })
        .catch(err => next(createError(500, err.message)));
};

// 🗑️ حذف دواء بديل
const deleteAltMedicine = (req, res, next) => {
    const id = req.params.id;

    altMedicine.delete(id)
        .then(result => {
            if (!result.deleted) return next(createError(404, 'Alt_Medicine is not Exists...'));
            res.status(200).json({ status: true, message: 'Alt_Medicine Deleted Sucsessfully...' });
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
