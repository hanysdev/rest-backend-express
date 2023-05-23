const express = require('express');
const router = express.Router()
const Book = require('../model/book');
const authenticateToken = require('../routes/userRoutes');
const cors = require('cors');
module.exports = router;

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  };
  
  // Dodaj middleware `cors` do routera
  router.use(cors(corsOptions));

//Post Method
router.post('/post', async (req, res) => {

    const data = new Book({
        kind: req.body.kind,
        full_sort_key: req.body.full_sort_key,
        title: req.body.title,
        url: req.body.url,
        cover_color: req.body.cover_color,
        author: req.body.author,
        cover: req.body.cover,
        epoch: req.body.epoch,
        href: req.body.href,
        has_audio: req.body.has_audio,
        genre: req.body.genre,
        simple_thumb: req.body.simple_thumb,
        slug: req.body.slug,
        cover_thumb: req.body.cover_thumb,
        liked: false
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
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(dataToGet)
    } catch (error) {
        res.status(500).json({message: error.message})    
    }
})

//Get by Title Mapping
router.get('/getOneByTitle/:title', authenticateToken,  async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        const dataToGet = await Book.find({"title": req.params.title})
        res.status(200).json(dataToGet)
    } catch (error) {
        res.status(500).json({message: error.message})    
    }
})

//Get by Author Mapping
router.get('/getOneByAuthor/:title', authenticateToken, async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        const dataToGet = await Book.find({"author": req.params.author})
        res.status(200).json(dataToGet)
    } catch (error) {
        res.status(500).json({message: error.message})    
    }
})

//Update by ID Method
router.patch('/update/:id', authenticateToken, async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
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
router.delete('/deleteById/:id', authenticateToken, async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        const id = req.params.id;
        const data = await Book.findByIdAndDelete(id)
        res.status(200).send()
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by Title
router.delete('/delete/:title', authenticateToken, async (req,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
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
    res.setHeader('Access-Control-Allow-Origin', '*');
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
    res.setHeader('Access-Control-Allow-Origin', '*');
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


