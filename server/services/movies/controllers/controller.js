const Movie = require('../models/movie')

class Controller {
  static addMovie(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body
    const obj = { title, overview, poster_path, popularity, tags }
    Movie.addMovie(obj)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => res.send(err))
  }
  static findMovie(req, res, next) {
    const { id } = req.params
    Movie.findMovie(id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.send(err))
  }
  static editMovie(req, res, next) {
    const field = ['title', 'overview', 'poster_path', 'popularity', 'tags']
    let obj = {}
    for (const key in req.body) {
      if (field.includes(key)){
        obj[key] = req.body[key]
      }
    }
    const { id } = req.params
    Movie.editMovie(id, obj)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.send(err))
  }
  static findMovie(req, res, next) {
    const { id } = req.params
    Movie.findMovie(id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.send(err))
  }
  static deleteMovie(req, res, next) {
    const { id } = req.params
    Movie.deleteMovie(id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.send(err))
  }
  static allMovie(req, res, next) {
    // const { id } = req.params
    Movie.allMovie()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.send(err))
  }
}

module.exports = Controller