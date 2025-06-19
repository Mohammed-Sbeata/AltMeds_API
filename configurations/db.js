const { MongoClient } = require('mongodb');

const _uri = process.env.MONGODB_URI;

const dbConnection = (collection, cb) => {
    if (!_uri) {
        console.error('MONGODB_URI is not defined in environment variables.');
        return;
    }

    MongoClient.connect(_uri)
        .then(async (client) => {
            const db = client.db('AltMeds_API').collection(collection);
            await cb(db);
            client.close();
        })
        .catch((err) => {
            console.error('Database connection failed:', err);
        });
};

module.exports = dbConnection;
