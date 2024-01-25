import express from "express";
import ExamController from "../controller/examController.js";

const examRoutes = express.Router();

examRoutes.get("/exams/:u_id", ExamController.getExams);
examRoutes.post("/exams", ExamController.createExam);

export default examRoutes;
