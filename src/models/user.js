
module.exports = (sequelize, DataTypes) =>{
  return sequelize.define('User', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    username : {
      unique : {//Username must be unique !important
        msg : 'Le nom d\'identification est deja pris'
      },
      type : DataTypes.STRING
    },
    password : {
      type : DataTypes.STRING
    }
  })
}