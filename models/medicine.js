const { getDb } = require('../configurations');
const { ObjectId } = require('bson');
const { medicineValidator } = require('../validators');

class Medicine {
    constructor(data) {
        this.medicineData = data;
    }

    save(callback) {
        const db = getDb();
        db.collection('medicines')
            .insertOne(this.medicineData)
            .then(result => {
                callback({ status: true, _id: result.insertedId });
            })
            .catch(err => {
                callback({ status: false, message: err.message });
            });
    }

    static async getAll() {
        const db = getDb();
        return await db.collection('medicines').find().toArray();
    }

    static async getById(id) {
        const db = getDb();
        return await db.collection('medicines').findOne({ _id: new ObjectId(id) });
    }

    static async update(id, data) {
        const db = getDb();
        const result = await db.collection('medicines').updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
        return { modified: result.modifiedCount > 0 };
    }

    static async delete(id) {
        const db = getDb();
        const result = await db.collection('medicines').deleteOne({ _id: new ObjectId(id) });
        return { deleted: result.deletedCount > 0 };
    }

    static validate(data) {
        return medicineValidator.medicineValidator.validate(data, { abortEarly: false });
    }
}

module.exports = Medicine;
