import { DataTypes } from "sequelize";
const sequelize = require("../config/database");
const User = require("./userModel");
const ExamCategorias = require("./examsCatModel");

const Exams = sequelize.define(
  "Exams",
  {
    exam_id: {
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
    exam_cat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ExamCategorias,
        key: "exam_cat_id",
      },
    },
    exam_desct: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    exam_file: {
      type: DataTypes.BLOB,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "exames",
  }
);

Exams.belongsTo(User, { foreignKey: "u_id" });
Exams.belongsTo(ExamCategorias, { foreignKey: "exam_cat_id" });

module.exports = Exams;
