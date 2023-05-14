const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    publicationDate: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('book', dataSchema)