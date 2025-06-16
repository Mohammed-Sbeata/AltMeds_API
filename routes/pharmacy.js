const express = require('express');
const router = express.Router();
const {pharmacyController} = require('../controllers');
const auth = require('../middlewares'); // لحماية المسارات

// ✅ إنشاء صيدلية جديدة (يتطلب تسجيل دخول)
router.post('/addPharmacy', auth, pharmacyController.createPharmacy);

// ✅ الحصول على كل الصيدليات
router.get('/getAllPharmacies',auth,  pharmacyController.getAllPharmacies);

// ✅ الحصول على صيدلية واحدة عبر ID
router.get('/:id',auth, pharmacyController.getPharmacyById);

// ✅ تعديل صيدلية (يتطلب تسجيل دخول)
router.put('/updatePharmacy/:id', auth, pharmacyController.updatePharmacy);

// ✅ حذف صيدلية (يتطلب تسجيل دخول)
router.delete('/deletePharmacy/:id', auth, pharmacyController.deletePharmacy);

module.exports = router;
