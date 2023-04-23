const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    emailAdress: {
        required: true,
        type: String
    },
    phoneNumber: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('users', dataSchema)