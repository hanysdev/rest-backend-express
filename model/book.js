const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    kind: {
        required: true,
        type: String
    },
    full_sort_key: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    },
    cover_color: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    cover: {
        required: true,
        type: String
    },
    epoch: {
        required: true,
        type: String
    },
    href: {
        required: true,
        type: String
    },
    has_audio: {
        required: true,
        type: Boolean
    },
    genre: {
        required: true,
        type: String
    },
    simple_thumb: {
        required: true,
        type: String
    },
    slug: {
        required: true,
        type: String
    },
    cover_thumb: {
        required: true,
        type: String
    },
    liked: {
        required: true,
        type: Boolean
    }
})

module.exports = mongoose.model('book', dataSchema)