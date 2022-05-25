const express = require('express')
const router = express.Router()

const placeModel = require('../models/Place')

router.get('/', async (req, res) => {
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
})

router.post('/', async (req, res) => {
	try {
		const place = await placeModel.create(req.body)
		return res.status(201).json({
			success: true,
			data: place
		})
	} catch (err) {
		if (err.code === 11000) {
			return res.status(400).json({ error: 'This place already exists!' });
		}
		res.status(500).json({ message: 'Server error!', error: err })
	}
})

module.exports = router