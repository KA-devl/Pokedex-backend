const { Pokemon } = require('../db/sequelize')
const {Op} = require('sequelize') //Operateurs
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name){
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5

      if (name.length < 2 ){//Avoiding unnecessary requests for one caracter
        const message = `Le terme de recherche doit contenir au moins 2 carateres.`
        return res.status(400).json({message})
      }
      return Pokemon.findAndCountAll({//Sequelize method to find number of results asked and total number of results
        where : {
          name : { //Property
            [Op.like] : `%${name}%`//Sequelize operator (Find common word)
          }
        },
        order:['name'], //Ascending
        limit: limit //Display max "limit" results or 5
      })
      .then(({count, rows}) => {
        const message = `Il y a ${count} pokemons qui correspondent au terme de recherche ${name}`
        res.json({message, data:rows})
      })
    } else {
      Pokemon.findAll({order : ['name']})
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
        //res.status(200).json({message, data:pokemons})
      })
      .catch(error =>{
        const message = 'La liste de pokemons n"a pas pu etre recuperee. Reesayez plustard'
        res.status(500).json({message, data:error})
      })
    }
  })
}
