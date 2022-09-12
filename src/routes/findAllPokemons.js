const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize"); //Operateurs
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/pokemons", auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;

      if (name.length < 2) {
        //Avoiding unnecessary requests for one caracter
        const message = `The search term must contain at least 2 characters`;
        return res.status(400).json({ message });
      }
      return Pokemon.findAndCountAll({
        //Sequelize method to find number of results asked and total number of results
        where: {
          name: {
            //Property
            [Op.like]: `%${name}%`, //Sequelize operator (Find common word)
          },
        },
        order: ["name"], //Ascending
        limit: limit, //Display max "limit" results or 5
      }).then(({ count, rows }) => {
        const message = `There is ${count} pokemons that correspond to your search ${name}.`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ["name"] })
        .then((pokemons) => {
          const message =
            "The list of pokemons have successfully been retreived.";
          res.json({ message, data: pokemons });
          //res.status(200).json({message, data:pokemons})
        })
        .catch((error) => {
          const message =
            "The list of pokemos was not retreived. Please try again later.";
          res.status(500).json({ message, data: error });
        });
    }
  });
};
