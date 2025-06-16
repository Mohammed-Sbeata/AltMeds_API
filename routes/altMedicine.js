const express = require('express');
const router = express.Router();
const auth = require('../middlewares');
const {altMedicineController} = require('../controllers');

// 🛡️ جميع المسارات محمية بالمدير (auth middleware)
router.use(auth);

// ➕ إنشاء دواء بديل
router.post('/addAltMedicine', altMedicineController.createAltMedicine);

// 📄 عرض جميع الأدوية البديلة
router.get('/getAllAltMedicine', altMedicineController.getAllAltMedicines);

// 📄 عرض دواء بديل حسب ID
router.get('/getOneAltMedicine/:id', altMedicineController.getAltMedicineById);

// ✏️ تعديل دواء بديل
router.put('/updateAltMedicine/:id', altMedicineController.updateAltMedicine);

// 🗑️ حذف دواء بديل
router.delete('/deleteAltMedicine/:id', altMedicineController.deleteAltMedicine);

module.exports = router;
