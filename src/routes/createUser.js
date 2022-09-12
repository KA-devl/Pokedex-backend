const {User} = require('../db/sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {
  app.post('/api/signup', (req, res) => {
    User.findOne({ where: { username: req.body.username } }).then(user => { //Search in db for username equivalent to request username
      if(user){
        const message = `The username ${user.username} already exists. Please choose a different username`
        return res.status(409).json({message})
      }
      bcrypt.hash(req.body.password, 10)
        .then(hash => User.create({username : req.body.username, password:hash}))
        .then(user => console.log(user.toJSON()))

        const message = 'The user have been created with success'
        return res.status(200).json({message, data:req.body})
   
      })
      .catch(error =>{
        const message = 'Sorry, we are unable to create a new account at the moment.'
        res.status(500).json({message, data:error})
      })
    })
      
  
  }