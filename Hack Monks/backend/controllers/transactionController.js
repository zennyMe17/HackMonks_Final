const Transaction = require('../models/transactionModel');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const { type, amount } = req.body;
    const transaction = new Transaction({ type, amount });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
