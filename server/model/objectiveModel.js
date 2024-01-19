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
  obj_itens: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  obj_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Objectives.belongsTo(User, { foreignKey: "u_id" });

module.exports = Objectives;
