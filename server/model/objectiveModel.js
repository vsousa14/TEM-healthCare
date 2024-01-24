import { DataTypes } from "sequelize";
const sequelize = require("../config/database");

const User = require("./userModel");

const Objectives = sequelize.define("Objectives", {
  obj_id: {
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
  obj_desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  obj_date: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
},
{
  tableName: "objetivos"
});

Objectives.belongsTo(User, { foreignKey: "u_id" });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database and tables have been synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

module.exports = Objectives;
