import express from "express";
import PressureController from "../controller/pressureController";

const pressureRoutes = express.Router();

pressureRoutes.post("/pressure", PressureController.makePressionTest);
pressureRoutes.get("/pressure/:u_id", PressureController.getAllPressionTests);

module.exports = pressureRoutes;
