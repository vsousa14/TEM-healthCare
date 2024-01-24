import Pressure from "../model/pressureModel";
import { Op } from "sequelize";

const err500 = "Erro Interno de Servidor";

const PressureController = {
  makePressionTest: async (req, res) => {
    try {
      
      const { u_id, press_sys, press_dia, press_date } = req.body;

      const newPressure = await Pressure.create({
        u_id,
        press_sys,
        press_dia,
        press_date,
      });

      return res.status(201).json(newPressure);
    } catch (error) {
      console.error("Erro ao criar pressão arterial:", error);
      return res.status(500).json({ error: err500 });
    }
  },

  getAllPressionTests: async (req, res) => {
    try {
      const { u_id } = req.params; 
      const pressures = await Pressure.findAll({
        where: {
          u_id: id,
        },
        order: [["press_sys", "DESC"]],
        limit: 10, 
        offset: 1, 
      });

      return res.status(200).json(pressures);
    } catch (error) {
      console.error("Erro ao buscar pressões arteriais:", error);
      return res.status(500).json({ error: err500 });
    }
  },

  getBestPressionTest: async (req, res) => {
    try {
      const { u_id } = req.params; 
      const bestPressure = await Pressure.findOne({
        where: {
          u_id: id,
        },
        order: [["press_sys", "DESC"]], 
      });

      return res.status(200).json(bestPressure);
    } catch (error) {
      console.error("Erro ao buscar o melhor resultado de pressão arterial:", error);
      return res.status(500).json({ error: err500 });
    }
  },
};

module.exports = PressureController;
