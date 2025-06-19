const { dbConnection } = require('../configurations');
const { pharmacyValidator } = require('../validators');
const { ObjectId } = require('bson');

class Pharmacy {
    constructor(data) {
        this.pharmacyData = data;
    }

    // إنشاء صيدلية جديدة
    save(cb) {
        dbConnection('pharmacies', async (collection) => {
            try {
                const result = await collection.insertOne(this.pharmacyData);
                cb({ status: true, _id: result.insertedId });
            } catch (err) {
                cb({ status: false, message: err.message });
            }
        });
    }

    // استرجاع كل الصيدليات
    static getAll() {
        return new Promise((resolve, reject) => {
            dbConnection('pharmacies', async (collection) => {
                try {
                    const pharmacies = await collection.find().toArray();
                    resolve(pharmacies);
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    // استرجاع صيدلية واحدة
    static getById(id) {
        return new Promise((resolve, reject) => {
            dbConnection('pharmacies', async (collection) => {
                try {
                    const pharmacy = await collection.findOne({ _id: new ObjectId(id) });
                    resolve(pharmacy);
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    // تعديل صيدلية
    static update(id, updateData) {
        return new Promise((resolve, reject) => {
            dbConnection('pharmacies', async (collection) => {
                try {
                    const result = await collection.updateOne(
                        { _id: new ObjectId(id) },
                        { $set: updateData }
                    );
                    resolve({ modified: result.modifiedCount > 0 });
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    // حذف صيدلية
    static delete(id) {
        return new Promise((resolve, reject) => {
            dbConnection('pharmacies', async (collection) => {
                try {
                    const result = await collection.deleteOne({ _id: new ObjectId(id) });
                    resolve({ deleted: result.deletedCount > 0 });
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    // التحقق من صحة البيانات قبل الحفظ
    static validate(data) {
        return pharmacyValidator.validate(data);
    }
}

module.exports = Pharmacy;
