const { Pokemon } = require('../db/sequelize')

module.exports = (app)=>{
app.delete('/api/pokemons/:id', (req,res)=>{
const id = req.params.id
Pokemon.findByPk(id)
.then(pokemon=>{
  if(pokemon === null){
    const message = 'Le pokemon nexiste pas'
    return res.status(404).json({message})
  }
  const deletedPokemon = pokemon;
  return Pokemon.destroy({
    where : { id: pokemon.id}
  }).then( _ =>{
    const message = `Le pokemon avec l'identifiant ${deletedPokemon.id} a bien ete supprimer`
    res.json({message , data : deletedPokemon})
  })
})//Only one catch is needed when the "return statement is used in Promises"
.catch(error =>{
  const message = 'Le pokemon na pas pu etre supprimer'
  res.status(500).json({message, data:error})
})
})
}