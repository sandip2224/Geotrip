const express = require('express')
const path = require('path')
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const { auth, requiresAuth } = require('express-openid-connect')
require('dotenv').config({ path: './.env' })

const connectDB = require('./server/config/db')
const app = express()
const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.SECRET,
	baseURL: process.env.BASE_URL,
	clientID: process.env.CLIENT_ID,
	issuerBaseURL: process.env.ISSUER_BASE_URL
}

connectDB()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'client/views'))

if (process.env.NODE_ENV == 'development') app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client/public')))

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config))
app.use('/api/v1/places', require('./server/routes/apiRoute'))
app.use('/', require('./server/routes/placeRoute'))

const server = app.listen(process.env.PORT || 3000, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT || 3000}`.green.bold))

process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`.red)
	server.close(() => process.exit(1))
})