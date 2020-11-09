const Series = require('../models/series')

class Controller {
  static addSeries(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body
    const obj = { title, overview, poster_path, popularity, tags }
    Series.addSeries(obj)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => res.send(err))
  }
  static findSeries(req, res, next) {
    const { id } = req.params
    Series.findSeries(id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.send(err))
  }
  static editSeries(req, res, next) {
    const field = ['title', 'overview', 'poster_path', 'popularity', 'tags']
    let obj = {}
    for (const key in req.body) {
      if (field.includes(key)){
        obj[key] = req.body[key]
      }
    }
    const { id } = req.params
    Series.editSeries(id, obj)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.send(err))
  }
  static findSeries(req, res, next) {
    const { id } = req.params
    Series.findSeries(id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.send(err))
  }
  static deleteSeries(req, res, next) {
    const { id } = req.params
    Series.deleteSeries(id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.send(err))
  }
  static allSeries(req, res, next) {
    // const { id } = req.params
    Series.allSeries()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.send(err))
  }
}

module.exports = Controller