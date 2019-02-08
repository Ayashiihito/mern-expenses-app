const express = require('express');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const url = 'mongodb://ayashiihito:42zense42@ds127115.mlab.com:27115/expenses_app';

const PORT = 5000;
const dbName = 'expenses_app';

const connectMongo = (url, dbName) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    assert.equal(null, err);
    console.log('Connected successfully to server');
    const db = client.db(dbName);
  });
};

const findDocuments = (db, callback) => {
  const collection = db.collection('expenses');
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    console.log('Found the following records');
    console.log(docs);
    callback(docs);
  });
};

const insertDocuments = (db, insert, callback) => {
  const collection = db.collection('expenses');
  collection.insertMany(insert, (err, result) => {
    assert.equal(err, null);
    console.log('Inserted 3 documents into the collection');
    callback(result);
  });
};

app.get('/api', (req, res) => {
  connectMongo(url, dbName);
  findDocuments(db, doc => {
    res.json(doc[0].wat);
    client.close();
  });
});

app.listen(process.env.PORT || PORT, () => console.log(`Started server at ${PORT}`));
