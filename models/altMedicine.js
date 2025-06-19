const {dbConnection} = require('../configurations')
const { ObjectId } = require('bson');
const { altMedicineValidator } = require('../validators');

class AltMedicine {
    constructor(data) {
        this.data = data;
    }

    static validate(data) {
        return altMedicineValidator.validate(data);
    }

    save(cb) {
        dbConnection.collection('altMedicines').insertOne({
            name: this.data.name,
            description: this.data.description || '',
            originalMedicineId: new ObjectId(this.data.originalMedicineId),
            pharmacyIds: (this.data.pharmacyIds || []).map(id => new ObjectId(id)),
            createdAt: new Date()
        })
        .then(result => cb({ status: true, _id: result.insertedId }))
        .catch(err => cb({ status: false, message: err.message }));
    }

static getAll() {
        return new Promise((resolve, reject) => {
            dbConnection.collection('altMedicines').find().toArray()
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            dbConnection.collection('altMedicines').findOne({ _id: new ObjectId(id) })
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }


static update(id, newData) {
        return new Promise((resolve, reject) => {
            // تحويل missingMedicineId و pharmacies إلى ObjectId إذا موجودة
            if (newData.missingMedicineId) {
                newData.missingMedicineId = new ObjectId(newData.missingMedicineId);
            }
            if (newData.pharmacies && Array.isArray(newData.pharmacies)) {
                newData.pharmacies = newData.pharmacies.map(id => new ObjectId(id));
            }

            dbConnection.collection('altMedicines').updateOne(
                { _id: new ObjectId(id) },
                { $set: newData }
            )
                .then(result => {
                    resolve({ modified: result.modifiedCount > 0 });
                })
                .catch(err => reject(err));
        });
    }
static delete(id) {
        return new Promise((resolve, reject) => {
            dbConnection.collection('altMedicines').deleteOne({ _id: new ObjectId(id) })
                .then(result => {
                    resolve({ deleted: result.deletedCount > 0 });
                })
                .catch(err => reject(err));
        });
    }
}

module.exports = AltMedicine;
