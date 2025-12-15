const express = require('express');
const app = express();

app.use(express.json());

app.use('/books', require('./routes/bookRoutes'));
app.use('/members', require('./routes/memberRoutes'));
app.use('/transactions', require('./routes/transactionRoutes'));
app.use('/fines', require('./routes/fineRoutes'));

app.get('/', (req, res) => {
  res.send('Library Management API running');
});

module.exports = app;
