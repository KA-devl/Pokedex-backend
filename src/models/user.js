
module.exports = (sequelize, DataTypes) =>{
  return sequelize.define('User', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    username : {
      type : DataTypes.STRING,
      unique : {//Username must be unique !important
        msg : 'Le nom d\'identification est deja pris'
      }
    },
    password : {
      type : DataTypes.STRING
    }
  })
}