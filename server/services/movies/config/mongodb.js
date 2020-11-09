const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'entertainMe';

// Create a new MongoClient
const client = new MongoClient(url);

module.exports =
  function () {
    const client = new MongoClient(url);
    return new Promise((resolve, reject) => {
      client.connect((err) => {
        if (err) {
          reject(err)
        } else {
          const db = client.db(dbName)
          resolve({
            client, db
          })
        }
      })
    })
  }