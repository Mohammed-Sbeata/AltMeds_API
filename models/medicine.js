const {dbConnection} = require('../configurations')
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
        dbConnection.collection('medicines').insertOne({
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
        return dbConnection.collection('medicines')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
    }

    static getById(id) {
        return dbConnection.collection('medicines').findOne({ _id: new ObjectId(id) });
    }

    // static update(id, data) {
    //     return dbConnection.collection('medicines').updateOne(
    //         { _id: new ObjectId(id) },
    //         {
    //             $set: {
    //                 name: data.name,
    //                 description: data.description || ''
    //             }
    //         }
    //     ).then(result => ({
    //         modified: result.modifiedCount > 0
    //     }));
    // }
    static update(id, updateData) {
        return new Promise((resolve, reject) => {
            dbConnection('medicines', async (collection) => {
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

    static delete(id) {
        return new Promise((resolve, reject) => {
            dbConnection('medicines', async (collection) => {
                try {
                    const result = await collection.deleteOne({ _id: new ObjectId(id) });
                    resolve({ deleted: result.deletedCount > 0 });
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
}

module.exports = Medicine;
