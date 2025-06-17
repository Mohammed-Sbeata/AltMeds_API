const {dbConnection} = require('../configurations')
const { ObjectId } = require('mongodb');
const { altMedicineValidator } = require('../validators');

class AltMedicine {
    constructor(data) {
        this.data = data;
    }

    static validate(data) {
        return altMedicineValidator.validate(data);
    }

    save(callback) {
        dbConnection.collection('alternative_medicines').insertOne({
            name: this.data.name,
            description: this.data.description || '',
            originalMedicineId: new ObjectId(this.data.originalMedicineId),
            pharmacyIds: (this.data.pharmacyIds || []).map(id => new ObjectId(id)),
            createdAt: new Date()
        })
        .then(result => callback({ status: true, _id: result.insertedId }))
        .catch(err => callback({ status: false, message: err.message }));
    }

    static getAll() {
        return dbConnection.collection('alternative_medicines')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
    }

    static getById(id) {
        return dbConnection.collection('alternative_medicines')
            .findOne({ _id: new ObjectId(id) });
    }

    static update(id, data) {
        return dbConnection.collection('alternative_medicines')
            .updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        name: data.name,
                        description: data.description || '',
                        originalMedicineId: new ObjectId(data.originalMedicineId),
                        pharmacyIds: (data.pharmacyIds || []).map(id => new ObjectId(id))
                    }
                }
            )
            .then(result => ({ modified: result.modifiedCount > 0 }));
    }

    static delete(id) {
        return dbConnection.collection('alternative_medicines')
            .deleteOne({ _id: new ObjectId(id) })
            .then(result => ({ deleted: result.deletedCount > 0 }));
    }
}

module.exports = AltMedicine;
