import express from "express";
import ExamController from "../controller/examController";

const examRoutes = express.Router();

examRoutes.get("/exams/:id", ExamController.getExams);
examRoutes.post("/exams", ExamController.createExam);

module.exports = examRoutes;
