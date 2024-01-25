import express from "express";
import PressureController from "../controller/pressureController.js";

const pressureRoutes = express.Router();

pressureRoutes.post("/pressure", PressureController.makePressionTest);
pressureRoutes.get("/pressure/:u_id", PressureController.getAllPressionTests);

export default pressureRoutes;
