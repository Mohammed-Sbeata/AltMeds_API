const express = require('express');
const router = express.Router();
const medicineController = require('../controllers');
const auth = require('../middlewares'); // لحماية المسارات الخاصة بالإدارة

// ➕ إضافة دواء مفقود (محمي)
router.post('/addMedicine', auth, medicineController.createMedicine);

// 📄 جلب كل الأدوية المفقودة (عام)
router.get('/gitAllMedicine', medicineController.getAllMedicines);

// 📄 جلب دواء مفقود حسب ID (عام)
router.get('/gitOneMedicine/:id', medicineController.getMedicineById);

// ✏️ تعديل دواء مفقود (محمي)
router.put('/updateMedicine/:id', auth, medicineController.updateMedicine);

// 🗑️ حذف دواء مفقود (محمي)
router.delete('/deleteMedicine/:id', auth, medicineController.deleteMedicine);

module.exports = router;
