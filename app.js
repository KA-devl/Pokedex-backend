const express = require ('express')
const morgan = require ('morgan') //middleware
const favicon = require ('serve-favicon')//middleware 2
const { success } = require ('./helper') //sans avoir a appeler tout le helper.js
const { getUniqueId } = require ('./helper')
const bodyParser = require('body-parser')
const {Sequelize} = require('sequelize')

let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

//Configurer database
const sequelize = new Sequelize(
  'pokedex',
  'root',
  '',
  {
    host: 'localhost',
    dialect : 'mariadb',
    dialectOptions : {
      timezone: 'Etc/GMT-2'
    },
    logging : false
  }

)
//Testing database connection
sequelize.authenticate()
.then(_=> console.log('La connexion a la database a bien ete etablie'))
.catch(error => console.error(`Impossible de se connecter a la data base ${error}`))

//middleware use
app
.use(favicon(__dirname +'/favicon.ico'))
.use(morgan('dev'))
.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello, express 2'))


app.get('/api/pokemons/:id', (req,res)=> {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  const message = 'Un pokemon a bien ete trouver'
res.json(success(message,pokemon)) 
})


app.get('/api/pokemons', (req,res)=>{
const message = 'La liste des pokemons a ete retrouver avec success'
res.json(success(message, pokemons))
})


app.post('/api/pokemons', (req,res) => {
  const id = getUniqueId(pokemons)
  const pokemonCreated = {...req.body, ...{id:id, created : new Date()}}
  pokemons.push(pokemonCreated)
  const message = `Le pokemon ${pokemonCreated.name} a bien ete creer`
  res.json(success(message, pokemonCreated))
})


app.put('/api/pokemons/:id', (req,res)=>{
  const id = parseInt(req.params.id)
  const pokemonUpdated = {...req.body, id: id}
  pokemons = pokemons.map(pokemon =>{
    return pokemon.id === id ? pokemonUpdated : pokemon
  })
  const message = `Le pokemon ${pokemonUpdated.name} a bien ete modifier`
  res.json(success(message, pokemonUpdated))

})

app.delete('/api/pokemons/:id', (req,res)=>{
  const id = parseInt(req.params.id)
  const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
  pokemons = pokemons.filter(pokemon => pokemon.id !== id ) 
  const message = `Le pokemon ${pokemonDeleted.name} a ete supprimer`
  res.json(success(message, pokemonDeleted))
})

app.listen(port, () => console.log(`Notre application node est demarrer sur : http://localhost:${port}`))