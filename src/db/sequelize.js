const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')
  
//Configurer database
const sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
//Testing & connecting to database
//sequelize.authenticate()
//.then(_=> console.log('La connexion a la database a bien ete etablie'))
//.catch(error => console.error(`Impossible de se connecter a la data base ${error}`))

  //Setting pokemon model
const Pokemon = PokemonModel(sequelize, DataTypes)
  
//Adding pokemons to db
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types.join()
      }).then(pokemon => console.log(pokemon.toJSON()))
    })
    console.log('La base de donnée a bien été initialisée !')
  })
}


  
module.exports = { 
  initDb, Pokemon
}