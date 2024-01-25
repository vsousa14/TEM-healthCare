import express from "express";
import NutritionController from "../controller/nutritionController";

const nutritionRoutes = express.Router();

nutritionRoutes.post("/nutrition", NutritionController.createUserPlan);
nutritionRoutes.get("/nutrition/:u_id", NutritionController.getUserPlan);
nutritionRoutes.put("/nutrition/:u_id", NutritionController.updatePlan);

module.exports = nutritionRoutes;
