const express = require('express')
const router = express.Router()

const { auth, requiresAuth } = require('express-openid-connect')

router.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.redirect('/home')
    }
    else res.render('auth')
})

router.post('/callback', (req, res) => {
    res.redirect('/home')
})

router.get('/home', requiresAuth(), (req, res) => {
    res.render('home', {
        userId: req.oidc.user.email
    })
})

router.get('/add', requiresAuth(), (req, res) => {
    res.render('add', {
        userId: req.oidc.user.email
    })
})

module.exports = router