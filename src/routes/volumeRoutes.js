const express = require('express');
const { getMilkProductionByFarmAndMonth } = require('../models/milkProductionModel');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Rota para consultar o volume de leite entregue e a média mensal
router.get('/volume', protect, async (req, res) => {
  const { farmerId, month, year } = req.query;
  
  if (!farmerId || !month || !year) {
    return res.status(400).json({ message: 'Missing query parameters: farmerId, month, or year' });
  }

  try {
    const productions = await getMilkProductionByFarmAndMonth(farmerId, parseInt(month), parseInt(year));

    if (!productions || productions.length === 0) {
      return res.status(404).json({ message: 'No milk production found for this farm and month.' });
    }

    const totalLiters = productions.reduce((sum, p) => sum + p.liters, 0);
    const averageLiters = totalLiters / productions.length;

    res.status(200).json({
      totalLiters,
      averageLiters,
    });
  } catch (error) {
    console.error('Error fetching milk production volume:', error);
    res.status(500).json({ message: 'Failed to fetch milk production volume' });
  }
});

module.exports = router;
