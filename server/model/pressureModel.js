import { DataTypes } from "sequelize";
const sequelize = require("../config/database");

const User = require("./userModel");

const Pressure = sequelize.define(
  "Pressure",
  {
    press_id: {
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
    press_sys: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    press_dia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    press_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
  },
  {
    tableName: "pressao",
  }
);

Pressure.belongsTo(User, { foreignKey: "u_id" });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database and tables have been synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

module.exports = Pressure;
