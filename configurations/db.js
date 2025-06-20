const { MongoClient } = require('mongodb');
require('dotenv').config();

const _uri = process.env.MONGODB_URI;
const _dbName = 'AltMeds_API';

let db = null;

const connectToDb = async () => {
    if (db) return db; 
    if (!_uri) {
        throw new Error('MONGODB_URI is not defined in environment variables.');
    }

    const client = new MongoClient(_uri, {
        useUnifiedTopology: true
    });

    await client.connect();
    db = client.db(_dbName);
    console.log('Connected to MongoDB');
    return db;
};

module.exports = {
    connectToDb,
    getDb: () => {
        if (!db) {
            throw new Error('Database not connected yet. Call connectToDb() first.');
        }
        return db;
    }
};
