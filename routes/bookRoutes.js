const express = require('express');
const router = express.Router()
const Book = require('../model/book');
const authenticateToken = require('../routes/userRoutes');
module.exports = router;

//Post Method
router.post('/post', async (req, res) => {
    const data = new Book({
        title: req.body.title,
        author: req.body.author,
        publicationDate: req.body.publicationDate
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
router.get('/getAllBooks', authenticateToken, async (req, res) => {
    try {
        const dataToGet = await Book.find()
        res.status(200).json(dataToGet)
    } catch (error) {
        res.status(500).json({message: error.message})    
    }
})

//Get by Title Mapping
router.get('/getOneByTitle/:title', authenticateToken,  async (req, res) => {
    try {
        const dataToGet = await Book.find({"title": req.params.title})
        res.status(200).json(dataToGet)
    } catch (error) {
        res.status(500).json({message: error.message})    
    }
})

//Get by Author Mapping
router.get('/getOneByAuthor/:title', authenticateToken, async (req, res) => {
    try {
        const dataToGet = await Book.find({"author": req.params.author})
        res.status(200).json(dataToGet)
    } catch (error) {
        res.status(500).json({message: error.message})    
    }
})

//Update by ID Method
router.patch('/update/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Book.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Book.findByIdAndDelete(id)
        res.send('Document with id:  ${data.name} has been deleted.')
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by Title
router.delete('/delete/:title', authenticateToken, async (req,res) => {
    try {
        const datas = await Book.find({"title": req.params.title})
        datas.forEach(async (oneData) => {
            const data = await Book.findByIdAndDelete(oneData._id)
            
        })
        res.send('All documents have been deleted')
    } catch (error) {
        res.status(400).json({ message: error.message })
    } 
})

//Delete by Author
router.delete('/delete/:author', authenticateToken, async (req,res) => {
    try {
        const datas = await Book.find({"author": req.params.author})
        datas.forEach(async (oneData) => {
            const data = await Book.findByIdAndDelete(oneData._id)
            
        })
        res.send('All documents have been deleted')
    } catch (error) {
        res.status(400).json({ message: error.message })
    } 
})

//Delete all
router.delete('/deleteAll', authenticateToken, async (req, res) =>{
    try {
        const datas = await Book.find()
        datas.forEach(async (oneData) => {
            const data = await Book.findByIdAndDelete(oneData._id)
            
        })
        res.send('All documents have been deleted')
    } catch (error) {
        res.status(400).json({ message: error.message })
    } 
})


