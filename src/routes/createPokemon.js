const { ValidationError, UniqueConstraintError } = require("sequelize");
const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/pokemons", auth, (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        const message = `The pokemon ${req.body.name} has been created.`;
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          res.status(400).json({ message: error.message, data: error });
        } else if (error instanceof UniqueConstraintError) {
          res.status(400).json({ message: error.message, data: error });
        } else {
          const message = "Sorry, we are not able to recuperate the pokemon";
          res.status(500).json({ message, data: error });
        }
      });
  });
};
