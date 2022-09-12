const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.put(('/api/pokemons/:id'),auth, (req,res)=>{
    const id = req.params.id
    Pokemon.update(req.body, {
      where : {id : id}
    })
    .then(_ =>{
      Pokemon.findByPk(id)
      .then(pokemon => {
        if(pokemon === null){
          const message = 'The pokemon asked does not exist.'
          return res.status(404).json({message})
        }
        const message = `The pokemon ${pokemon.name} have been successfully modified.`
        res.json({message, data: pokemon})
      })
    })
    .catch(error => {
      if(error instanceof ValidationError){
       res.status(400).json({message: error.message, data:error})
      }
      else if (error instanceof UniqueConstraintError){
        res.status(400).json({message:error.message, data:error})
      }
      else
      {const message = 'Unable to modify the pokemon. Please try again later.'
      res.status(500).json({message, data: error})}
    })
  })

}