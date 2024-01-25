import { DataTypes } from "sequelize";
const sequelize = require("../config/database");

const DocCategorias = require("./docCatModel");

const User = sequelize.define(
  "User",
  {
    u_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    u_nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    u_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    u_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    u_role: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    doc_cat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      references: {
        model: DocCategorias,
        key: "doc_cat_id",
      },
    },
  },
  {
    tableName: "users",
  }
);

User.belongsTo(DocCategorias, { foreignKey: "doc_cat_id" });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database and tables have been synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

module.exports = User;
