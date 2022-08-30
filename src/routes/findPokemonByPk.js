const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.get(('/api/pokemons/:id'), (req,res)=>{
    const id = req.params.id
    Pokemon.findByPk(id)
    .then(pokemon =>{
      if(pokemon === null){
        const message = 'Le pokemon demander nexiste pas.'
        return res.status(404).json({message})
      }
      const message = `Le pokemon a bien été récupérée.`
      res.json({ message, data: pokemon })
    })
    .catch(error => {
      const message = 'Le pokemon na pas pu etre recuperer'
      res.status(500).json({message, data:error})
    })
  })

}