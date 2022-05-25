const NodeGeocoder = require('node-geocoder')

const options = {
	provider: process.env.GEOCODER_PROVIDER,
	apiKey: process.env.GEOCODER_API_KEY,
	formatter: null
}

const geocoder = NodeGeocoder(options)
console.log(geocoder)

module.exports = geocoder