const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
    },
    index: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course