const mongoose = require("mongoose")

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    designation: {
        type: String,
        trim: true,
        default: ''
    },
    content: {
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

const Testimonal = mongoose.model('Testimonial', testimonialSchema)

module.exports = Testimonal