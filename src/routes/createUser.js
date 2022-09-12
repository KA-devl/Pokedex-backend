const {User} = require('../db/sequelize')
const bcrypt = require('bcrypt')
const { ValidationError, UniqueConstraintError } = require('sequelize')

module.exports = (app) => {
  app.post('/api/signup', (req, res) => {
    User.findOne({ where: { username: req.body.username } }).then(user => { //Search in db for username equivalent to request username
      if(user){
        const message = `The username ${user.username} already exists. Please choose a different username`
        return res.status(409).json({message})
      }
      //Use regex to check validate password
      let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
      if(reg.test(req.body.password) == false){ //if password is invalid, throw error
        const message = `The password Minimum 6 characters, at least one letter and one number.`
        return res.status(409).json({message})
      }

      bcrypt.hash(req.body.password, 10) //if everything is correct, hash the password and push it safely to the db
        .then(hash => User.create({username : req.body.username, password:hash}))
        .then(user => { 
        const message = 'The user have been created with success'
        return res.status(200).json({message, data:user})
      })
        .catch(error =>{
          if(error instanceof ValidationError){
            res.status(400).json({message:error.message, data:error})
          }
          else if (error instanceof UniqueConstraintError){
            res.status(400).json({message:error.message, data:error})
          } 
          else 
          {const message = 'Sorry, we are unable to create a new account at the moment.'
          res.status(500).json({message, data:error})}
        })

        
   
      })//Outer catch for FindOne()
      .catch(error =>{
        if(error instanceof ValidationError){
          res.status(400).json({message:error.message, data:error})
        }
        else if (error instanceof UniqueConstraintError){
          res.status(400).json({message:error.message, data:error})
        } 
        else 
        {const message = 'Sorry, we are unable to create a new account at the moment.'
        res.status(500).json({message, data:error})}
      })
    })
      
  
  }