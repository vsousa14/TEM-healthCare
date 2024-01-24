import { DataTypes } from "sequelize";
const sequelize = require("../config/database");

const User = require("./userModel");

const Nutrition = sequelize.define("Nutrition", {
  nutr_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  u_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "u_id",
    },
  },
  nutr_dayoftheweek: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nutr_mealtype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nutr_desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: "nutricao"
});

Nutrition.belongsTo(User, { foreignKey: "u_id" });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database and tables have been synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

module.exports = Nutrition;
