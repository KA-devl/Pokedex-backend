module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        //Username must be unique !important
        msg: "This username already exists. Please choose a different username",
      },
      validate: {
        is: {
          msg: "match at 6 letters in the front,have at least one letter, match zero to any occurrence of the given numbers range, and cannot have any special characters.",
          args: /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/i,
        },
        notEmpty: { msg: "The username should not be empty" },
        notNull: { msg: "The username is required" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "The password should not be empty" },
        notNull: { msg: "The password is required" },
      },
    },
  });
};
