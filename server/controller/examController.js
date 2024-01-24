import Exams from "../model/examsModel";

const err500 = "Erro Interno de Servidor";

const ExamController = {
  getExams: async (req, res) => {
    try {
      const u_id = req.params.id;

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
};

module.exports = ExamController;
