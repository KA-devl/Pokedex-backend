const { ValidationError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        if(error instanceof ValidationError){
          res.status(400).json({message:error.message, data:error})
        }
        const message = 'Le pokemon na pas pu etre recuperer.'
        res.status(500).json({message, data: error})
      })
  })
}