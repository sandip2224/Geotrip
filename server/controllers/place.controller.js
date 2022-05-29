exports.render_base_route = (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.redirect('/home')
    }
    else res.render('auth')
}

exports.auth0_callback_route_post_login = (req, res) => {
    res.redirect('/home')
}

exports.render_home_page = (req, res) => {
    res.render('home', {
        userId: req.oidc.user.email
    })
}