const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const dataSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
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
    },
    isAdmin: {
        required: false,
        type: Boolean
    }
})

dataSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  };
  
dataSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
    }
    next();
  });
  

module.exports = mongoose.model('users', dataSchema)