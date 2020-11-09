const router = require('express').Router()
const Controller = require('../controllers/controller.js')

router.get('/', Controller.allMovie)
router.post('/', Controller.addMovie)
router.get('/:id', Controller.findMovie)
router.put('/:id', Controller.editMovie)
router.delete('/:id', Controller.deleteMovie)

module.exports = router