const express = require('express');
const router = express.Router();
const {medicineController} = require('../controllers');
const {auth} = require('../middlewares'); 

router.post('/addMedicine', auth, medicineController.createMedicine);

router.get('/gitAllMedicine', medicineController.getAllMedicines);

router.get('/gitOneMedicine/:id', medicineController.getMedicineById);

router.put('/updateMedicine/:id', auth, medicineController.updateMedicine);

router.delete('/deleteMedicine/:id', auth, medicineController.deleteMedicine);

module.exports = router;
