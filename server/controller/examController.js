import Exams from "../model/examsModel";

const err500 = "Erro Interno de Servidor";

const ExamController = {
  getExams: async (req, res) => {
    try {
      const exams = await Exams.findAll();
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

  getOneExam: async (req, res) => {
    try {
      const exam_id = req.params.id;
      const exam = await Exams.findByPk(exam_id);

      if (!exam) {
        return res.status(404).json({ error: "Exame não encontrado" });
      }

      res.status(200).json(exam);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

module.exports = ExamController;
