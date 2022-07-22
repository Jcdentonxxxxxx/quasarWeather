const {
  Sequelize
} = require("sequelize");

module.exports = (sequelize) => {
  const UserShema = Sequelize.define("User", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isActivated: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    activationLink: {
      type: Sequelize.STRING,
    }
  }, {
    timestamps: false,
  });
  return UserShema;
}
