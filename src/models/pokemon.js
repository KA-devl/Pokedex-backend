module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, //Object is unique
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      //Fix createPokemon sequelize problem : Getter : database -> rest API
      get() {
        return this.getDataValue('types').split(',')
      }, //Setter : Rest api -> db
      set(types){
        this.setDataValue('types', types.join())
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}