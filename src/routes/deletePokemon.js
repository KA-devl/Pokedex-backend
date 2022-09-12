const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", auth, (req, res) => {
    const id = req.params.id;
    Pokemon.findByPk(id)
      .then((pokemon) => {
        if (pokemon === null) {
          const message = "The pokemon doesnt exist";
          return res.status(404).json({ message });
        }
        const deletedPokemon = pokemon;
        return Pokemon.destroy({
          where: { id: pokemon.id },
        }).then((_) => {
          const message = `The pokemon with the id ${deletedPokemon.id} has been deleted`;
          res.json({ message, data: deletedPokemon });
        });
      }) //Only one catch is needed when the "return statement is used in Promises"
      .catch((error) => {
        const message = "Sorry, the pokemon couldnt be deleted";
        res.status(500).json({ message, data: error });
      });
  });
};
