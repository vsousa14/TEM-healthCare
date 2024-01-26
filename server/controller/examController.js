import Exams from "../model/examsModel.js";

const err500 = "Erro Interno de Servidor";

const ExamController = {
  getExams: async (req, res) => {
    try {
      const u_id = req.params.u_id;

      const exams = await Exams.findAll({
        where: { u_id: u_id },
      });

      res.status(200).json(exams);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  createExam: async (req, res) => {
    try {
      const newExam = await Exams.create(req.body);
      res.status(201).json(newExam);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getLastThree: async (req, res) => {
    try {
      const u_id = req.params.u_id;

      const exams = await Exams.findAll({
        where: { u_id: u_id },
        order: [["createdAt", "DESC"]],
        limit: 3,
      });

      res.status(200).json(exams);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default ExamController;
