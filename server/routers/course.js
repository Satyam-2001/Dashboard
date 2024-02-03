const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Course = require("../models/Course")

const props = ['title', 'description', 'url', 'image']

router.get('/course', async (req, res) => {
    try {
        const courses = await Course.find({})
        res.status(200).send(courses)
    }
    catch (e) {
        res.status(400).send()
    }
})

router.post('/course', auth, async (req, res) => {
    try {
        const index = await Course.countDocuments({});
        const course = new Course({ index, ...req.body })
        await course.save()
        res.status(201).send(course)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.post('/course/orderup', auth, async (req, res) => {
    try {
        const course_1 = await Course.findOne({ _id: req.body.id })
        const index = course_1.index
        if (index === 0) return res.send();
        const course_2 = await Course.findOne({ index: index - 1 })
        const c1 = {}
        const c2 = {}
        for (let key of props) {
            c1[key] = course_1[key];
            c2[key] = course_2[key];
        }
        await Course.replaceOne({ _id: course_1._id }, { ...c1, index: index - 1 })
        await Course.replaceOne({ _id: course_2._id }, { ...c2, index })
        res.send()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/course/orderdown', auth, async (req, res) => {
    try {
        const course_1 = await Course.findOne({ _id: req.body.id })
        const index = course_1.index
        const course_2 = await Course.findOne({ index: index + 1 })
        if (!course_2) return res.send();
        const c1 = {}
        const c2 = {}
        for (let key of props) {
            c1[key] = course_1[key];
            c2[key] = course_2[key];
        }
        await Course.replaceOne({ _id: course_1._id }, { ...c1, index: index + 1 })
        await Course.replaceOne({ _id: course_2._id }, { ...c2, index })
        res.send()
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/course', auth, async (req, res) => {

    try {
        const course = await Course.findByIdAndUpdate(req.body._id, req.body)
        res.send(course)
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.delete('/course/:id', auth, async (req, res) => {
    try {
        await Course.deleteOne({ _id: req.params.id })
        res.send()
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router

