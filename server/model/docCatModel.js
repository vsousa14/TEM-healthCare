import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

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

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database and tables have been synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

export default DocCategorias;
