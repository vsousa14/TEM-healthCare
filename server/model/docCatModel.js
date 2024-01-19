import { DataTypes } from "sequelize";
const sequelize = require("../config/database");

const DocCategorias = sequelize.define(
  "DocCategorias",
  {
    doc_cat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    doc_cat_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "doc_categories",
  }
);

module.exports = DocCategorias;
