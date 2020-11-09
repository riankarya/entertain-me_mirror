const { axiosMovies } = require('../config/axios')
const Redis = require('ioredis')
const redis = new Redis()

class Controller {
  static async addMovies(req, res, next) {
    try {
      const { data } = await axiosMovies({
        url: '/',
        method: 'post',
        data: req.body
      })
      redis.del('moviesCache')
      res.status(201).json(data)
    }
    catch(err) {
      console.log(err)
    }
  }
  static async findMovies(req, res, next) {
    const { id } = req.params
    try {
      const { data } = await axiosMovies({
        url: `/${id}`,
        method: 'get'
      })
      res.status(201).json(data)
    }
    catch(err) {
      console.log(err)
    }
  }
  static async editMovies(req, res, next) {
    const { id } = req.params
    try {
      const { data } = await axiosMovies({
        url: `/${id}`,
        method: 'put',
        data: req.body
      })
      redis.del('moviesCache')
      res.status(201).json(data)
    }
    catch(err) {
      console.log(err)
    }
  }
  static async deleteMovies(req, res, next) {
    const { id } = req.params
    try {
      const { data } = await axiosMovies({
        url: `/${id}`,
        method: 'delete'
      })
      redis.del('moviesCache')
      res.status(201).json(data)
    }
    catch(err) {
      console.log(err)
    }
  }
  static async allMovies(req, res, next) {
    const moviesCache = await redis.get('moviesCache')
    if (moviesCache) {
      res.status(201).json(JSON.parse(moviesCache))
    } else {
      try {
        const { data } = await axiosMovies({
          url: '/',
          method: 'get'
        })
        redis.set('moviesCache', JSON.stringify(data))
        res.status(201).json(data)
      }
      catch(err) {
        console.log(err)
      }
    }
  }
}

module.exports = Controller