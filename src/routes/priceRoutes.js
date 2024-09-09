const express = require('express');
const { getMilkProductionByFarmAndMonth } = require('../models/milkProductionModel');
const { calculateMilkPrice } = require('../services/milkPricingService');
const { getFarmerById } = require('../models/farmerModel');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Rota para consultar o preço do litro de leite
router.get('/price', protect, async (req, res) => {
  const { farmerId, month } = req.query;
  const year = new Date().getFullYear();

  if (!farmerId || !month) {
    return res.status(400).json({ message: 'Missing query parameters: farmerId or month' });
  }

  try {
    const productions = await getMilkProductionByFarmAndMonth(farmerId, parseInt(month), year);

    if (!productions || productions.length === 0) {
      return res.status(404).json({ message: 'No milk production found for this farm and month.' });
    }

    const totalLiters = productions.reduce((sum, p) => sum + p.liters, 0);
    const farmer = await getFarmerById(farmerId);
    const pricePerLiter = calculateMilkPrice(totalLiters, farmer.distance, parseInt(month));

    res.status(200).json({
      pricePerLiterBRL: pricePerLiter.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      pricePerLiterUSD: pricePerLiter.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    });
  } catch (error) {
    console.error('Error calculating milk price:', error);
    res.status(500).json({ message: 'Failed to calculate milk price' });
  }
});

module.exports = router;
