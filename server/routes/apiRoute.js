const router = require('express').Router()

const apiController = require('../controllers/api.controller')

router.get('/', apiController.get_all_places)

router.post('/', apiController.create_new_place)

module.exports = router