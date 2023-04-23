const express = require('express');
const router = express.Router()
const User = require('../model/user');
module.exports = router;

//Post Method
router.post('/', async (req, res) => {
    const data = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAdress: req.body.emailAdress,
        phoneNumber: req.body.phoneNumber
    })

    try {
        const dataToSave = await data.save();
        res.status(201).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const dataToGet = await User.find()
        res.status(200).json(dataToGet)
    } catch (error) {
        res.status(500).json({message: error.message})    
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const dataToGet = await User.findById(req.params.id)
        res.status(200).json(dataToGet)
    } catch (error) {
        res.status(500).json({message: error.message})    
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        res.send('Document with id:  ${data.name} has been deleted.')
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete all
router.delete('/deleteAll', async (req, res) =>{
    try {
        const datas = await User.find()
        datas.forEach(async (oneData) => {
            const data = await User.findByIdAndDelete(oneData._id)
            
        })
        res.send('All users have been deleted')
    } catch (error) {
        res.status(400).json({ message: error.message })
    } 
})