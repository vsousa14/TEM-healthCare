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
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true,
    },
  },
  {
    tableName: "exames",
  }
);

Exams.belongsTo(User, { foreignKey: "u_id" });
Exams.belongsTo(ExamCategorias, { foreignKey: "exam_cat_id" });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database and tables have been synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

module.exports = Exams;
