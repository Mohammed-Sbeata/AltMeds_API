const express = require('express');
const router = express.Router();
const {pharmacyController} = require('../controllers');
const {auth} = require('../middlewares'); 

router.post('/addPharmacy', auth, pharmacyController.createPharmacy);

router.get('/getAllPharmacies',auth,  pharmacyController.getAllPharmacies);

router.get('/getPharmacyById/:id',auth, pharmacyController.getPharmacyById);

router.put('/updatePharmacy/:id', auth, pharmacyController.updatePharmacy);

router.delete('/deletePharmacy/:id', auth, pharmacyController.deletePharmacy);

module.exports = router;
