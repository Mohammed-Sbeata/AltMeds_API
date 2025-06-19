const { dbConnection } = require('../configurations');
const pharmacySchema = require('../validators/pharmacy'); // لاحظ أننا استوردنا schema مباشرة
const { ObjectId } = require('bson');

class Pharmacy {
    constructor(data) {
        this.pharmacyData = data;
    }

    // ...

    static validate(data) {
        return pharmacySchema.validate(data); // ✅ استدعاء validate من الـ schema نفسه
    }
}

module.exports = Pharmacy;
