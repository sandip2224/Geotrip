const express = require('express')
const path = require('path')
const colors = require('colors')
require('dotenv').config({ path: './.env' })

const connectDB = require('./config/db')

const app = express()

connectDB()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/places', require('./routes/placeRoute'))
app.use('/', require('./routes/placeRoute'))

const server = app.listen(process.env.PORT || 3000, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT || 3000}`.green.bold))

process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    server.close(() => process.exit(1))
})