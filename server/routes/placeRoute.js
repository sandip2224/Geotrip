const router = require('express').Router()

const { auth, requiresAuth } = require('express-openid-connect')

const placeController = require('../controllers/place.controller')

router.get('/', placeController.render_base_route)

router.post('/callback', placeController.auth0_callback_route_post_login)

router.get('/home', requiresAuth(), placeController.render_home_page)

module.exports = router