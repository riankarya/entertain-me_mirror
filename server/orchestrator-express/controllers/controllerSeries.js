const { axiosSeries } = require('../config/axios')
const Redis = require('ioredis')
const redis = new Redis()

class Controller {
  static async addSeries(req, res, next) {
    try {
      const { data } = await axiosSeries({
        url: '/',
        method: 'post',
        data: req.body
      })
      redis.del('seriesCache')
      res.status(201).json(data)
    }
    catch(err) {
      console.log(err)
    }
  }
  static async findSeries(req, res, next) {
    const { id } = req.params
    try {
      const { data } = await axiosSeries({
        url: `/${id}`,
        method: 'get'
      })
      res.status(201).json(data)
    }
    catch(err) {
      console.log(err)
    }
  }
  static async editSeries(req, res, next) {
    const { id } = req.params
    try {
      const { data } = await axiosSeries({
        url: `/${id}`,
        method: 'put',
        data: req.body
      })
      redis.del('seriesCache')
      res.status(201).json(data)
    }
    catch(err) {
      console.log(err)
    }
  }
  static async deleteSeries(req, res, next) {
    const { id } = req.params
    try {
      const { data } = await axiosSeries({
        url: `/${id}`,
        method: 'delete'
      })
      redis.del('seriesCache')
      res.status(201).json(data)
    }
    catch(err) {
      console.log(err)
    }
  }
  static async allSeries(req, res, next) {
    const seriesCache = await redis.get('seriesCache')
    if (seriesCache) {
      res.status(201).json(JSON.parse(seriesCache))
    } else {
      try {
        const { data } = await axiosSeries({
          url: '/',
          method: 'get'
        })
        redis.set('seriesCache', JSON.stringify(data))
        res.status(201).json(data)
      }
      catch(err) {
        console.log(err)
      }
    }
  }
}

module.exports = Controller