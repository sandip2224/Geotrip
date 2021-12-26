const express = require('express')
const router = express.Router()

const { auth, requiresAuth } = require('express-openid-connect')

router.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()) res.redirect('/home')
    else res.render('auth')
})

router.get('/home', requiresAuth(), (req, res) => {
    res.render('home')
})

router.get('/add', requiresAuth(), (req, res) => {
    res.render('add')
})

module.exports = router