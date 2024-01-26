import express from "express";
import ExamController from "../controller/examController.js";

const examRoutes = express.Router();

examRoutes.get("/get/:u_id", ExamController.getExams);
examRoutes.post("/create", ExamController.createExam);
examRoutes.get("/lasthree", ExamController.getLastThree);

export default examRoutes;
