const { getDb } = require('../configurations');
const { ObjectId } = require('bson');
const { pharmacyValidator } = require('../validators');

class Pharmacy {
    constructor(data) {
        this.pharmacyData = data;
    }

    save(callback) {
        const db = getDb();
        db.collection('pharmacies')
            .insertOne(this.pharmacyData)
            .then(result => {
                callback({ status: true, _id: result.insertedId });
            })
            .catch(err => {
                callback({ status: false, message: err.message });
            });
    }

    static async getAll() {
        const db = getDb();
        return await db.collection('pharmacies').find().toArray();
    }

    static async getById(id) {
        const db = getDb();
        return await db.collection('pharmacies').findOne({ _id: new ObjectId(id) });
    }

    static async update(id, data) {
        const db = getDb();
        const result = await db.collection('pharmacies').updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
        return { modified: result.modifiedCount > 0 };
    }

    static async delete(id) {
        const db = getDb();
        const result = await db.collection('pharmacies').deleteOne({ _id: new ObjectId(id) });
        return { deleted: result.deletedCount > 0 };
    }

    static validate(data) {
        return pharmacyValidator.pharmacyValidator.validate(data, { abortEarly: false });
    }
}

module.exports = Pharmacy;
