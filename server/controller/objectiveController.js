import Objectives from "../model/objectiveModel";

const err500 = "Erro Interno do Servidor";

const ObjectivesController = {
  createObjective: async (req, res) => {
    try {
      const newObjective = await Objectives.create(req.body);

      res.status(201).json(newObjective);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getObjectives: async (req, res) => {
    try {
      const u_id = req.params.id;
      const objectives = await Objectives.findAll({
        where: { u_id: u_id },
      });

      res.status(200).json(objectives);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

module.exports = ObjectivesController;
