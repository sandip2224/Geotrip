const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')

const PlaceSchema = new mongoose.Schema({
    locationId: {
        type: String,
        required: [true, 'Please add a location alias'],
        trim: true,
        maxlength: [10, 'Location alias must be less than 10 chars']
    },
    address: {
        type: String,
        required: [true, 'Please add a location address']
    },
    userId: {
        type: String,
        required: true
    },
    location: { // Will be done automatically
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

PlaceSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address)
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }
    this.address = undefined
    next()
})

module.exports = mongoose.model('Place', PlaceSchema)