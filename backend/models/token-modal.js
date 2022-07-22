const {
  Sequelize
} = require("sequelize");

module.exports = (sequelize) => {
  const TokenShema = Sequelize.define("Token", {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false
    },
    refreshToken: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false,
  });
  return TokenShema;
}
