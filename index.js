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


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})


// Simple Model Routes
const modelRoutes = require('./routes/modelRoutes');
app.use('/api', modelRoutes)

// User Model Routes
const userRoutes = require('./routes/userRoutes');
app.use('/user-management/users', userRoutes)