const express = require('express');
const adminRouter = express.Router()
const User = require('../model/user');
const jwt = require('jsonwebtoken')
module.exports = adminRouter;

function autorizeAdmin(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(decodedToken.user)
  if(!decodedToken.isAdmin) {
    return res.status(403).json({ message: 'No admin rights'});
  }
  next();
}
//Admin Token
adminRouter.post('/token', (req,res) => {
  //Authenticate user

  const username = req.body.username
  const password = req.body.password
  const emailAdress = req.body.emailAdress
  const isAdmin = req.body.isAdmin


  const user = {username : username, password: password, emailAdress: emailAdress, isAdmin: isAdmin}

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken})
})

//New user creation
adminRouter.post('/', autorizeAdmin, (req, res) => {
    const { username, password } = req.body;
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        emailAdress: req.body.emailAdress,
        phoneNumber: req.body.phoneNumber,
        isAdmin: false
    });
    user.save()
      .then(result => {
        res.status(201).json({ message: 'Użytkownik został utworzony', userId: result._id });
      })
      .catch(error => {
        res.status(500).json({ message: 'Błąd podczas tworzenia użytkownika', error });
      });
  });

adminRouter.delete('/delete/:id', autorizeAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        res.send('User with id:  ${data.name} has been deleted.')
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

adminRouter.put('/:userId/permissions', autorizeAdmin, async (req, res) => {
    try {
        const user = await User.findById(id);
    
        user.isAdmin = !user.isAdmin;
    
        await user.save();
    
        return user;
      } catch (err) {
        console.error(err);
      }
    }
);

adminRouter.get('/admin', autorizeAdmin, (req, res) => {
  // Handle request from authenticated admin
  res.send('Welcome, admin!');
});