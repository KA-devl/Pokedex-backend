const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.post('/api/pokemons', auth,(req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.set('Access-Control-Allow-Origin', '*');
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        if(error instanceof ValidationError){
          res.status(400).json({message:error.message, data:error})
        }
        else if (error instanceof UniqueConstraintError){
          res.status(400).json({message:error.message, data:error})
        }
        else
        {const message = 'Le pokemon na pas pu etre recuperer.'
        res.status(500).json({message, data: error})}
      })
  })
}