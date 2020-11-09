const router = require('express').Router()
const Controller = require('../controllers/controllerMovies.js')

router.get('/', Controller.allMovies)
router.post('/', Controller.addMovies)
router.get('/:id', Controller.findMovies)
router.put('/:id', Controller.editMovies)
router.delete('/:id', Controller.deleteMovies)

module.exports = router