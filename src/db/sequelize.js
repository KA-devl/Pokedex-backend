const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')

  
//Configurer database
    if(process.env.NODE_ENV === 'production'){
 /*  sequelize = new Sequelize('kk8u5y871hfoaw9y', 't09tvm6qofrtvc7h', 'ryujse9ftf40wpqn', {
    host: 'klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  }) */
  sequelize = new Sequelize('pokedextest', 'pokedexadmin', 'Pokedex1999', {
    host: 'pokedextest1.database.windows.net',
    dialect: 'mysql',
    driver: 'tedious',
    logging: true,
    port:1433
  })
}else {
  sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })
  
} 


//Testing & connecting to database
//sequelize.authenticate()
//.then(_=> console.log('La connexion a la database a bien ete etablie'))
//.catch(error => console.error(`Impossible de se connecter a la data base ${error}`))

  //Setting pokemon & user  model
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
  
//Adding mock pokemons to db
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })//Password hashing
    bcrypt.hash('pikachu', 10) //Args : (password, hashTime)
    .then(hash =>User.create({username : 'pikachu', password: hash})) //Recuperate hashed password and push it to db
    .then(user => console.log(user.toJSON()))

    console.log("DATABASE HAVE BEEN INTIALIZED WITH SUCCESS")
  })
  
}

//export modules to the rest of the components
module.exports = { 
  initDb, Pokemon, User
}