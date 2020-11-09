const router = require('express').Router()
const series = require('./routeSeries')
const movies = require('./routeMovies')
const ControllerApp = require('../controllers/controllerApp')

router.get('/', ControllerApp.allMoviesSeries)
router.use('/movies', movies)
router.use('/series', series)

module.exports = router