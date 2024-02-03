const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
    }
    catch (e) {
        res.status(500).send()
    }
})

router.post('/user/password', auth, async (req, res) => {
    const props = ['username', 'tokens']
    try {
        const updatedUser = {}
        for (const key of props) {
            updatedUser[key] = req.user[key]
        }
        updatedUser.password = await bcrypt.hash(req.body.password, 8)
        const user = await User.findByIdAndUpdate(req.user._id, updatedUser)
        res.send({ user, token: req.token })
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router