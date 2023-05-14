const express = require('express');
const router = express.Router()
const User = require('../model/user');
module.exports = router;

const jwt = require('jsonwebtoken')

function authenticateToken(req, req, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

//Login
router.post('/token', (req,res) => {
    //Authenticate user

    const username = req.body.username
    const password = req.body.password
    const emailAdress = req.body.emailAdress

    const user = {username : username, password: password, emailAdress: emailAdress}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken})
})

//Post Method
router.post('/', async (req, res) => {
    const data = new User({
        username: req.body.username,
        password: req.body.password,
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

//Register User
router.post('/register', async (req, res) => {
    try {
      const { username, password, emailAdress, phoneNumber } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ emailAdress: emailAdress });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }
  
      // Create new user
      const user = new User({
        username: username,
        password: password,
        emailAdress: emailAdress,
        phoneNumber: phoneNumber
      });
      await user.save();
  
      res.json({ message: 'User registered successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  

  //Password change

  router.put('/change-password', authenticateToken, async (req, res) => {
    try {
      const { userId, currentPassword, newPassword, confirmPassword } = req.body;
  
      // Validate new password
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'New password and confirmation password do not match.' });
      }
  
      // Find user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Not such a User in db.' });
      }
  
      // Check current password
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect current password.' });
      }
  
      // Update password
      user.password = newPassword;
      await user.save();
  
      res.json({ message: 'Password updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });


  