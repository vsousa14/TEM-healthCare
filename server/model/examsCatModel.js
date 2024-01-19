import { DataTypes } from "sequelize";
const sequelize = require("../config/database");

const ExamCategorias = sequelize.define(
  "ExamCategorias",
  {
    exam_cat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    exam_cat_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "exames_categories",
  }
);

module.exports = ExamCategorias;
