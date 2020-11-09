const { axiosMovies, axiosSeries } = require('../config/axios')
const Redis = require('ioredis')
const redis = new Redis()

class Controller {
  static async allMoviesSeries(req, res, next) {
    const moviesCache = await redis.get('moviesCache')
    const seriesCache = await redis.get('seriesCache')
    if (moviesCache && seriesCache) {
      const moviesList = JSON.parse(moviesCache)
      const seriesList = JSON.parse(seriesCache)
      res.status(201).json({ moviesList, seriesList })
    } else {
      let data = {movies: null, series: null}
      try {
        if (moviesCache) {
          const moviesList = JSON.parse(moviesCache)    
        } else {
          const { data: movies } = await axiosMovies({
            url: '/',
            method: 'get'
          })
          data = {movies}
          redis.set('moviesCache', JSON.stringify(movies))
        }
        if (seriesCache) {
          const seriesList = JSON.parse(seriesCache)
        } else {
          const { data: series } = await axiosSeries({
            url: '/',
            method: 'get'
          })
          data = {series}
          redis.set('seriesCache', JSON.stringify(series))
        }
        // const data = { movies, series }
        console.log(data, 'asup ti controllerApp')
        redis.set('moviesSeriesCache', JSON.stringify(data))
        res.status(201).json(data)
      }
      catch(err) {
        console.log(err)
      }
    }
  }
}

module.exports = Controller