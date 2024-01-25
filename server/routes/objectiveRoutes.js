import express from "express";
import ObjectivesController from "../controller/objectiveController";

const objectivesRoutes = express.Router();

objectivesRoutes.post("/objectives", ObjectivesController.createObjective);
objectivesRoutes.get("/objectives/:u_id", ObjectivesController.getObjectives);
objectivesRoutes.delete(
  "/objectives/:id",
  ObjectivesController.deleteObjective
);

module.exports = objectivesRoutes;
