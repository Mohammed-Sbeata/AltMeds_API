const express = require('express');
const router = express.Router();
const {auth} = require('../middlewares');
const {altMedicineController} = require('../controllers');

router.use(auth);

router.post('/addAltMedicine', altMedicineController.createAltMedicine);

router.get('/getAllAltMedicine', altMedicineController.getAllAltMedicines);

router.get('/getOneAltMedicine/:id', altMedicineController.getAltMedicineById);

router.put('/updateAltMedicine/:id', altMedicineController.updateAltMedicine);

router.delete('/deleteAltMedicine/:id', altMedicineController.deleteAltMedicine);

module.exports = router;
