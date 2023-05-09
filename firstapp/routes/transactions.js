const express = require('express');
const router = express.Router();
const transaction = require('../models/NewTransactions');

let transactions = [];

router.get('/transaction', function(req, res) {
    res.render('transaction', { transactions: transactions });
});;
  

router.post('/transactions', function(req, res) {
    const transactionData = {
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
      createdAt: new Date(req.body.date)
    };
    transactions.push(transactionData);
    res.redirect('/transaction');
    console.log(transactions);
  });
  

module.exports = router;
