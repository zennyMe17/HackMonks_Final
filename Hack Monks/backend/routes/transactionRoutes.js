const express = require('express');
const router = express.Router();  // Define the router

const Transaction = require('../models/transactionModel');

// Define your routes here
router.post('/', async (req, res) => {
  try {
    const { type, amount, comment } = req.body;

    if (!type || !amount) {
      return res.status(400).json({ error: 'Type and amount are required' });
    }

    const newTransaction = {
      type,
      amount,
      comment: comment || 'Watched video',  // Default to an empty string if no comment
      date: new Date(),
    };

    // Assuming you are saving the new transaction in your database
    const transaction = new Transaction(newTransaction);
    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Export the router
module.exports = router;
