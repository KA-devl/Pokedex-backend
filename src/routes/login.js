const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({ where: { username: req.body.username } }).then(user => { //Search in db for username equivalent to request username
      if(!user){
        const message = 'The username does not exist. Please enter a valid username and password'
        return res.status(404).json({message})
      }
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => { // compare the password of the request username to the password of the current user found
        if(!isPasswordValid) {
          const message = `The password is incorrect`;
          return res.status(401).json({ message})
        }
        //JWT
        const token = jwt.sign({userId: user.id}, privateKey, {expiresIn: '24h'}) //Create token
        const message = `The user have been connected with success`;
        return res.json({message, data:user, token})
        
      })
    })
    .catch(error =>{
        const message = 'Unable to login. Please try again later.'
        return res.json({message, data:error})
    })
  })
}