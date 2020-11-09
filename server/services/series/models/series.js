let { ObjectID } = require('mongodb')
const mongoConnect = require('../config/mongodb')
ObjectID = require('mongodb').ObjectID

function addSeries(newSeries) {
  return new Promise(async (resolve, reject) => {
    let mongoClient
    try {
      let { db, client } = await mongoConnect()
      mongoClient = client
      let collection = db.collection('series')
      let insertedSeries = await collection.insertOne(newSeries)
      resolve(insertedSeries)
    }
    catch (err) {
      reject(err)
    }
    finally {
      mongoClient.close()
    }
  })
}
function findSeries(id) {
  return new Promise(async (resolve, reject) => {
    let mongoClient
    try {
      let { db, client } = await mongoConnect()
      mongoClient = client
      let collection = db.collection('series')
      let seriesFound = await collection.findOne({
        _id: { $eq: ObjectID(id) }
      })
      resolve(seriesFound)
    }
    catch (err) {
      reject(err)
    }
    finally {
      mongoClient.close()
    }
  })
}
function editSeries(id, obj) {
  return new Promise(async (resolve, reject) => {
    let mongoClient
    try {
      let { db, client } = await mongoConnect()
      mongoClient = client
      let collection = db.collection('series')
      let editedSeries = await collection.findOneAndUpdate(
        { _id: { $eq: ObjectID(id) } },
        { $set: obj }
      )
      resolve(editedSeries)
    }
    catch (err) {
      reject(err)
    }
    finally {
      mongoClient.close()
    }
  })
}
function deleteSeries(id) {
  return new Promise(async (resolve, reject) => {
    let mongoClient
    try {
      let { db, client } = await mongoConnect()
      mongoClient = client
      let collection = db.collection('series')
      let deletedSeries = await collection.findOneAndDelete({
        _id: { $eq: ObjectID(id) }
      })
      resolve(deletedSeries)
    }
    catch (err) {
      reject(err)
    }
    finally {
      mongoClient.close()
    }
  })
}
function allSeries() {
  return new Promise(async (resolve, reject) => {
    let mongoClient
    try {
      let { db, client } = await mongoConnect()
      mongoClient = client
      let collection = db.collection('series')
      let allSeries = await collection.find().toArray()
      resolve(allSeries)
    }
    catch (err) {
      reject(err)
    }
    finally {
      mongoClient.close()
    }
  })
}

module.exports = { addSeries, findSeries, editSeries, deleteSeries, allSeries }