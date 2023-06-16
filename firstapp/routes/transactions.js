const express = require('express');
const router = express.Router();
const transaction = require('../models/NewTransactions');
const fs = require('fs');

if (!fs.existsSync('./data')) { //check to see the directory exists
  fs.mkdirSync('./data');
  fs.writeFileSync('./data', '[]');
}
const FILE_PATH = './data/transactions.json';

let unformattedTransactions = []; //create an empty array for the transactions
if (fs.existsSync(FILE_PATH)) {
  const data = fs.readFileSync(FILE_PATH);
  unformattedTransactions = JSON.parse(data);
}

let transactions = unformattedTransactions.map(unformattedTransactions => { // map the transactions
  return {
    id: unformattedTransactions.id,
    description: unformattedTransactions.description,
    amount: unformattedTransactions.amount,
    category: unformattedTransactions.category,
    createdAt: new Date(unformattedTransactions.createdAt)
  };
});

router.get('/transaction', function(req, res) {
    res.render('transaction', { transactions: transactions });
});;
  

router.post('/transactions', function(req, res) { //post the transactions to the page
    const transactionData = {
      id: Date.now(),
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
      createdAt: new Date(req.body.date)
    };
    transactions.push(transactionData);
    const data = JSON.stringify(transactions);
    fs.writeFileSync(FILE_PATH, data);
    res.redirect('/transaction');
    console.log(transactions);
  });

router.delete('/transactions/:id', function(req, res) { //pretty straightfoward delete transaction by id
    const id = req.params.id;
    transactions = transactions.filter(transaction => transaction.id != req.params.id);
    const data = JSON.stringify(transactions);
    fs.writeFileSync(FILE_PATH, data);
    res.redirect('/transaction');
  });
  

module.exports = router;
