require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const router = express.Router()
module.exports = router; 
const app = express();
app.use(express.json());


mongoose.connect(mongoString);
const database = mongoose.connection;

// Database check
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port ${port}')
})


// Simple Sample Routes
const sampleRoutes = require('./routes/sampleRoutes');
app.use('/api', sampleRoutes)

// User Model Routes
const userRoutes = require('./routes/userRoutes');
app.use('/user-management/users', userRoutes)

//Book Model Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/book-management/books', bookRoutes)

//Admin Routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin/users', adminRoutes)