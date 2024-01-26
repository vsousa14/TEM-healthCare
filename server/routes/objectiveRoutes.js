import express from "express";
import ObjectivesController from "../controller/objectiveController.js";

const objectivesRoutes = express.Router();

objectivesRoutes.post("/create", ObjectivesController.createObjective);
objectivesRoutes.get("/get/:u_id", ObjectivesController.getObjectives);
objectivesRoutes.delete(
  "/delete/:id",
  ObjectivesController.deleteObjective
);

export default objectivesRoutes;
