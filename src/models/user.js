
module.exports = (sequelize, DataTypes) =>{
  return sequelize.define('User', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    username : {
      type : DataTypes.STRING,
      allowNull: false,
      unique : {//Username must be unique !important
        msg : 'This username already exists. Please choose a different username'
      },
      validate : {
        notEmpty: {msg: 'The username should not be empty'},
        notNull : {msg : 'The username is required'}
      }
    },
    password : {
      type : DataTypes.STRING
    }
  })
}