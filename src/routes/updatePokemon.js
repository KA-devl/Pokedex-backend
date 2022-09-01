const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.put(('/api/pokemons/:id'), (req,res)=>{
    const id = req.params.id
    Pokemon.update(req.body, {
      where : {id : id}
    })
    .then(_ =>{
      Pokemon.findByPk(id)
      .then(pokemon => {
        if(pokemon === null){
          const message = 'Le pokemon demander nexiste pas'
          return res.status(404).json({message})
        }
        const message = `Le pokemon ${pokemon.name} a bien ete modifier`
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
      {const message = 'Le pokemon na pas pu etre modifier.'
      res.status(500).json({message, data: error})}
    })
  })

}