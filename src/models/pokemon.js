const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, //Pokemon Object is unique
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          //Name is unique
          msg: "Le nom est deja pris",
        },
        validate: {
          notEmpty: { msg: "Le nom ne peut etre vide" },
          notNull: { msg: "Le nom est requis" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement des nomberes entiers pour le hp" },
          notNull: { msg: "Points de vie sont requis" },
          min: {
            args: [0],
            msg: "Le nombre de hp doit etre minimalement de 0",
          },
          max: {
            args: [999],
            msg: "Le nombre de hp doit etre maximalement de 999",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement des nomberes entiers pour le cp" },
          notNull: { msg: "Points de cp sont requis" },
          min: {
            args: [0],
            msg: "Le nombre de cp doit etre minimalement de 0",
          },
          max: {
            args: [99],
            msg: "Le nombre de cp doit etre maximalement de 99",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "URL pas valide" },
          notNull: { msg: "L'image est requise" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        //Fix createPokemon sequelize problem : Getter : database -> rest API
        get() {
          return this.getDataValue("types").split(",");
        }, //Setter : Rest api -> db
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error("Un pokemon doit au moins avoir un type");
            }
            if (value.split(",").length > 3) {
              throw new Error("Un pokemon ne peut pas avoir plus de 3 types");
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokemon doit appartenir a la liste suivate : ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
