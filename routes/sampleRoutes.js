const express = require('express');
const router = express.Router()
const Sample = require('../model/sample');
module.exports = router;

//Post Method
router.post('/post', async (req, res) => {
    const data = new Sample({
        name: req.body.name,
        age: req.body.age
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
        const dataToGet = await Sample.find()
        res.status(200).json(dataToGet)
    } catch (error) {
        res.status(500).json({message: error.message})    
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const dataToGet = await Sample.findById(req.params.id)
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

        const result = await Sample.findByIdAndUpdate(
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
        const data = await Sample.findByIdAndDelete(id)
        res.send('Document with id:  ${data.name} has been deleted.')
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete all
router.delete('/deleteAll', async (req, res) =>{
    try {
        const datas = await Sample.find()
        datas.forEach(async (oneData) => {
            const data = await Sample.findByIdAndDelete(oneData._id)
            
        })
        res.send('All documents have been deleted')
    } catch (error) {
        res.status(400).json({ message: error.message })
    } 
})