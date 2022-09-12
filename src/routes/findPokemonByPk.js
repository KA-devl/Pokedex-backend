const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get(('/api/pokemons/:id'),auth, (req,res)=>{
    const id = req.params.id
    Pokemon.findByPk(id)
    .then(pokemon =>{
      if(pokemon === null){
        const message = 'The pokemon asked does not exist.'
        return res.status(404).json({message})
      }
      const message = `The pokemon have been retrieved successfully.`
      res.json({ message, data: pokemon })
    })
    .catch(error => {
      const message = 'The pokemon was not retreived. Please try again later.'
      res.status(500).json({message, data:error})
    })
  })

}