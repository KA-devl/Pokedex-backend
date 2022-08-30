const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.get(('/api/pokemons/:id'), (req,res)=>{
    const id = req.params.id
    Pokemon.findByPk(id)
    .then(pokemon =>{
      const message = `Le pokemon a bien été récupérée.`
      res.json({ message, data: pokemon })
    })
  })

}