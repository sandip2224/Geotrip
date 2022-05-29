const placeModel = require('../models/Place')

exports.get_all_places = async (req, res) => {
    try {
        const places = await placeModel.find()
        return res.status(200).json({
            success: true,
            count: places.length,
            data: places
        })
    } catch (err) {
        res.status(500).json({ message: 'Server error!', error: err })
    }
}

exports.create_new_place = async (req, res) => {
    try {
        const place = await placeModel.create(req.body)
        return res.status(201).json({
            success: true,
            data: place
        })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'This location already exists!' })
        }
        res.status(500).json({ message: 'Server error!', error: err })
    }
}