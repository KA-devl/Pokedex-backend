const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({ where: { username: req.body.username } }).then(user => { //Search in db for username equivalent to request username
      if(!user){
        const message = 'L\'utilisateur n\'existe pas'
        return res.status(404).json({message})
      }
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => { // compare the password of the request username to the password of the current user found
        if(!isPasswordValid) {
          const message = `Le mot de passe est incorrect`;
          return res.json.status(401)({ message})
        }
        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({message, data:user})
        
      })
    })
    .catch(error =>{
        const message = 'L\'utilisateur n\'a pas pu se connecter. Reessayez plustard'
        return res.json({message, data:error})
    })
  })
}