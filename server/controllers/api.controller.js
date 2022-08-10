const redis = require('redis')

const placeModel = require('../models/Place')

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    // password: process.env.REDIS_PASSWORD
})

client.on("error", (err) => {
    console.log(err);
})

client.connect();

exports.get_all_places = async (req, res) => {
    try {
        const value = await client.get("places")
        const parsedData = JSON.parse(value)
        if (parsedData) {
            return res.status(200).json({
                success: true,
                status: 'Served from cache!!',
                count: parsedData.length,
                data: parsedData
            })
        }
        const places = await placeModel.find()
        await client.set("places", JSON.stringify(places), {
            EX: 10,
            NX: true
        })
        return res.status(200).json({
            success: true,
            status: 'Served from database!!',
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