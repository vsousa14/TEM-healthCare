import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

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

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database and tables have been synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

export default ExamCategorias;
