let { ObjectID } = require('mongodb')
const mongoConnect = require('../../series/config/mongodb')
ObjectID = require('mongodb').ObjectID

function addMovie(newMovie) {
  return new Promise(async (resolve, reject) => {
    let mongoClient
    try {
      let { db, client } = await mongoConnect()
      mongoClient = client
      let collection = db.collection('movies')
      let insertedMovie = await collection.insertOne(newMovie)
      resolve(insertedMovie)
    }
    catch (err) {
      reject(err)
    }
    finally {
      mongoClient.close()
    }
  })
}
function findMovie(id) {
  return new Promise(async (resolve, reject) => {
    let mongoClient
    try {
      let { db, client } = await mongoConnect()
      mongoClient = client
      let collection = db.collection('movies')
      let movieFound = await collection.findOne({
        _id: { $eq: ObjectID(id) }
      })
      resolve(movieFound)
    }
    catch (err) {
      reject(err)
    }
    finally {
      mongoClient.close()
    }
  })
}
function editMovie(id, obj) {
  return new Promise(async (resolve, reject) => {
    let mongoClient
    try {
      let { db, client } = await mongoConnect()
      mongoClient = client
      let collection = db.collection('movies')
      let editedMovie = await collection.findOneAndUpdate(
        { _id: { $eq: ObjectID(id) } },
        { $set: obj }
      )
      resolve(editedMovie)
    }
    catch (err) {
      reject(err)
    }
    finally {
      mongoClient.close()
    }
  })
}
function deleteMovie(id) {
  return new Promise(async (resolve, reject) => {
    let mongoClient
    try {
      let { db, client } = await mongoConnect()
      mongoClient = client
      let collection = db.collection('movies')
      let deletedMovie = await collection.findOneAndDelete({
        _id: { $eq: ObjectID(id) }
      })
      resolve(deletedMovie)
    }
    catch (err) {
      reject(err)
    }
    finally {
      mongoClient.close()
    }
  })
}
function allMovie() {
  return new Promise(async (resolve, reject) => {
    let mongoClient
    try {
      let { db, client } = await mongoConnect()
      mongoClient = client
      let collection = db.collection('movies')
      let allMovie = await collection.find().toArray()
      resolve(allMovie)
    }
    catch (err) {
      reject(err)
    }
    finally {
      mongoClient.close()
    }
  })
}

module.exports = { addMovie, findMovie, editMovie, deleteMovie, allMovie }