const { getDb } = require('../configurations');
const { ObjectId } = require('bson');
const  {altMedicineValidator}  = require('../validators');

class AltMedicine {
    constructor(data) {
        this.data = data;
    }

    // ✅ دالة التحقق
    static validate(data) {
        return altMedicineValidator.altMedicineValidator.validate(data, { abortEarly: false });
    }

    save(callback) {
        const db = getDb();
        db.collection('altMedicines')
            .insertOne({
                name: this.data.name,
                description: this.data.description || '',
                originalMedicineId: new ObjectId(this.data.originalMedicineId),
                pharmacyIds: (this.data.pharmacyIds || []).map(id => new ObjectId(id)),
                createdAt: new Date()
            })
            .then(result => callback({ status: true, _id: result.insertedId }))
            .catch(err => callback({ status: false, message: err.message }));
    }

    static async getAll() {
        const db = getDb();
        return await db.collection('altMedicines').find().toArray();
    }

    static async getById(id) {
        const db = getDb();
        return await db.collection('altMedicines').findOne({ _id: new ObjectId(id) });
    }

    static async update(id, data) {
        const db = getDb();

        if (data.originalMedicineId) {
            data.originalMedicineId = new ObjectId(data.originalMedicineId);
        }

        if (Array.isArray(data.pharmacyIds)) {
            data.pharmacyIds = data.pharmacyIds.map(id => new ObjectId(id));
        }

        const result = await db.collection('altMedicines').updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );

        return { modified: result.modifiedCount > 0 };
    }

    static async delete(id) {
        const db = getDb();
        const result = await db.collection('altMedicines').deleteOne({ _id: new ObjectId(id) });
        return { deleted: result.deletedCount > 0 };
    }
}

module.exports = AltMedicine;
