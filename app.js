const express = require ('express')
const morgan = require ('morgan') //middleware
const favicon = require ('serve-favicon')//middleware 2
const bodyParser = require('body-parser')
const sequelize = require ('./src/db/sequelize')

const app = express()
const port = 3000


//Middleware use
app
.use(favicon(__dirname +'/favicon.ico'))
.use(morgan('dev'))
.use(bodyParser.json())

//Initialize db
sequelize.initDb()

//Routes
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)



app.listen(port, () => console.log(`Notre application node est demarrer sur : http://localhost:${port}`))