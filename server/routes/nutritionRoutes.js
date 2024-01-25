import express from "express";
import NutritionController from "../controller/nutritionController.js";

const nutritionRoutes = express.Router();

nutritionRoutes.post("/nutrition", NutritionController.createUserPlan);
nutritionRoutes.get("/nutrition/:u_id", NutritionController.getUserPlan);
nutritionRoutes.put("/nutrition/:u_id", NutritionController.updatePlan);

export default nutritionRoutes;
