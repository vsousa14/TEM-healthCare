import express from "express";
import NutritionController from "../controller/nutritionController";

const nutritionRoutes = express.Router();

nutritionRoutes.post("/nutrition", NutritionController.createUserPlan);
nutritionRoutes.get("/nutrition/:id", NutritionController.getUserPlan);
nutritionRoutes.put("/nutrition/:id", NutritionController.updatePlan);

module.exports = nutritionRoutes;
