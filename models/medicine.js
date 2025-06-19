const {dbConnection} = require('../configurations')
const { ObjectId } = require('bson');
const { medicineValidator } = require('../validators');

class Medicine {
    constructor(data) {
        this.data = data;
    }

    static validate(data) {
        return medicineValidator.validate(data);
    }

    save(cb) {
        dbConnection.collection('medicines').insertOne({
            name: this.data.name,
            description: this.data.description || '',
            createdAt: new Date()
        })
        .then(result => {
            cb({ status: true, _id: result.insertedId });
        })
        .catch(err => {
            cb({ status: false, message: err.message });
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            dbConnection.collection('medicines').find().toArray()
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            dbConnection.collection('medicines').findOne({ _id: new ObjectId(id) })
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

     // تحديث دواء حسب ID
    static update(id, newData) {
        return new Promise((resolve, reject) => {
            dbConnection.collection('medicines').updateOne(
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
            dbConnection.collection('medicines').deleteOne({ _id: new ObjectId(id) })
                .then(result => {
                    resolve({ deleted: result.deletedCount > 0 });
                })
                .catch(err => reject(err));
        });
    }
}

module.exports = Medicine;
