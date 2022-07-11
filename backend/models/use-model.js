const Sequelize = require("sequelize");

const UserShema = Sequelize.define("userSecTable", {
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
    allowNull: false
  },
  activationLink: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
