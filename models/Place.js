const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
    placeId: {
        type: String,
        required: [true, 'Please add a place id'],
        unique: true,
        trim: true,
        maxlength: [10, 'Place id must be less than 10 chars']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
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

module.exports = mongoose.model('Place', PlaceSchema)