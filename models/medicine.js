const { getDB } = require('../configurations');
const { ObjectId } = require('mongodb');
const { medicineValidator } = require('../validators');

class Medicine {
    constructor(data) {
        this.data = data;
    }

    static validate(data) {
        return medicineValidator.validate(data);
    }

    save(callback) {
        const db = getDB();
        db.collection('medicines').insertOne({
            name: this.data.name,
            description: this.data.description || '',
            createdAt: new Date()
        })
        .then(result => {
            callback({ status: true, _id: result.insertedId });
        })
        .catch(err => {
            callback({ status: false, message: err.message });
        });
    }

    static getAll() {
        const db = getDB();
        return db.collection('medicines')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
    }

    static getById(id) {
        const db = getDB();
        return db.collection('medicines').findOne({ _id: new ObjectId(id) });
    }

    static update(id, data) {
        const db = getDB();
        return db.collection('medicines').updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name: data.name,
                    description: data.description || ''
                }
            }
        ).then(result => ({
            modified: result.modifiedCount > 0
        }));
    }

    static delete(id) {
        const db = getDB();
        return db.collection('medicines').deleteOne({ _id: new ObjectId(id) })
            .then(result => ({
                deleted: result.deletedCount > 0
            }));
    }
}

module.exports = Medicine;
