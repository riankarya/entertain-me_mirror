const router = require('express').Router()
const Controller = require('../controllers/controller.js')

router.get('/', Controller.allSeries)
router.post('/', Controller.addSeries)
router.get('/:id', Controller.findSeries)
router.put('/:id', Controller.editSeries)
router.delete('/:id', Controller.deleteSeries)

module.exports = router