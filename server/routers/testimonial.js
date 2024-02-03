const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Testimonial = require("../models/Testimonial")

const props = ['name', 'designation', 'content', 'image']

router.get('/testimonial', async (req, res) => {
    try {
        const testimonials = await Testimonial.find({})
        res.status(200).send(testimonials)
    }
    catch (e) {
        res.status(400).send()
    }
})

router.post('/testimonial', auth, async (req, res) => {
    try {
        const index = await Testimonial.countDocuments({});
        const testimonial = new Testimonial({ index, ...req.body })
        await testimonial.save()
        res.status(201).send(testimonial)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.post('/testimonial/orderup', auth, async (req, res) => {
    try {
        const testimonial_1 = await Testimonial.findOne({ _id: req.body.id })
        const index = testimonial_1.index
        if (index === 0) return res.send();
        const testimonial_2 = await Testimonial.findOne({ index: index - 1 })
        const updated_testimonial_1 = {}
        const updated_testimonila_2 = {}
        for (let key of props) {
            updated_testimonial_1[key] = testimonial_1[key];
            updated_testimonila_2[key] = testimonial_2[key];
        }
        await Testimonial.replaceOne({ _id: testimonial_1._id }, { ...updated_testimonial_1, index: index - 1 })
        await Testimonial.replaceOne({ _id: testimonial_2._id }, { ...updated_testimonila_2, index })
        res.send()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/testimonial/orderdown', auth, async (req, res) => {
    try {
        const testimonial_1 = await Testimonial.findOne({ _id: req.body.id })
        const index = testimonial_1.index
        const testimonial_2 = await Testimonial.findOne({ index: index + 1 })
        if (!testimonial_2) return res.send();
        const updated_testimonial_1 = {}
        const updated_testimonila_2 = {}
        for (let key of props) {
            updated_testimonial_1[key] = testimonial_1[key];
            updated_testimonila_2[key] = testimonial_2[key];
        }
        await Testimonial.replaceOne({ _id: testimonial_1._id }, { ...updated_testimonial_1, index: index + 1 })
        await Testimonial.replaceOne({ _id: testimonial_2._id }, { ...updated_testimonila_2, index })
        res.send()
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/testimonial', auth, async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(req.body._id, req.body)
        res.send(testimonial)
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.delete('/testimonial/:id', auth, async (req, res) => {
    try {
        await Testimonial.deleteOne({ _id: req.params.id })
        res.send()
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router