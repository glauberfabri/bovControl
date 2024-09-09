const express = require('express');
const { addMilkProduction } = require('../models/milkProductionModel');
const protect = require('../middleware/authMiddleware'); // Middleware de autenticação
const Joi = require('joi'); // Validação com Joi

const router = express.Router();

// Definir esquema de validação para a produção de leite
const milkProductionSchema = Joi.object({
  farmerId: Joi.string().required(),
  liters: Joi.number().positive().required(),
  date: Joi.date().required(),
});

// Rota para registrar a produção diária de leite
router.post('/productions', protect, async (req, res) => {
  const { error } = milkProductionSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { farmerId, liters, date } = req.body;
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();

    const productionData = {
      farmerId,
      liters,
      date,
      month,
      year,
    };

    const newProduction = await addMilkProduction(productionData);
    res.status(201).json(newProduction);
  } catch (error) {
    console.error('Error adding milk production:', error);
    res.status(500).json({ message: 'Failed to add milk production' });
  }
});

module.exports = router;
