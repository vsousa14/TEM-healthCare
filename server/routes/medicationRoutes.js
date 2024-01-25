import express from "express";
import MedicationController from "../controller/medicationController";

const medicationRouter = express.Router();

medicationRouter.get(
  "/prescriptions/:u_id",
  MedicationController.getAllPrescriptions
);
medicationRouter.post(
  "/prescriptions",
  MedicationController.createPrescription
);
medicationRouter.delete(
  "/prescriptions",
  MedicationController.deletePrescription
);
medicationRouter.get(
  "/prescriptions/file",
  MedicationController.requestPrescription
);
medicationRouter.post(
  "/prescriptions/file",
  MedicationController.sendPrescription
);

module.exports = medicationRouter;
