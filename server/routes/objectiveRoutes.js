import express from "express";
import ObjectivesController from "../controller/objectiveController";

const objectivesRoutes = express.Router();

objectivesRoutes.post("/objectives", ObjectivesController.createObjective);
objectivesRoutes.get("/objectives", ObjectivesController.getObjectives);
objectivesRoutes.delete("/objectives", ObjectivesController.deleteObjective);

module.exports = objectivesRoutes;