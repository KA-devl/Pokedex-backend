const {Pokemon} = require('../db/sequelize')

module.exports = (app)=>{
app.delete('/api/pokemons/:id', (req,res)=>{
const id = req.params.id
Pokemon.findPyPk(id)
.then(pokemon=>{
  const deletedPokemon = pokemon;
  Pokemon.destroy({
    where : { id: pokemon.id}
  }).then( _ =>{
    const message = `Le pokemon avec l'identifiant ${deletedPokemon.id} a bien ete supprimer`
    res.json({message , data : deletedPokemon})
  })
})
})
}