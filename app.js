const express = require ('express')
const favicon = require ('serve-favicon')//middleware 2
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require ('./src/db/sequelize')



const app = express()
const port = process.env.PORT || 3000



//Middleware use
app
.use(favicon(__dirname +'/favicon.ico'))
.use(bodyParser.json())
.use(cors())

//Initialize db
sequelize.initDb()

app.get('/', (req,res)=>{
  res.json('HELLO, THIS IS THE POKEDEX REST API. TO TEST THE ROOTS, PLEASE AUTHENTIFY WITH /login')
})


//Routes
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

//Error 404 gestion
app.use(({res}) => {
  const message = 'Impossible de trouver la ressource demandee. Essayez un URL different '
  res.status(404).json({message})
})



app.listen(port)