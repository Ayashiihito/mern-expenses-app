const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const expenses = require('./routes/api/expenses');

const PORT = 5000;

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/api/expenses', expenses);

app.listen(process.env.PORT || PORT, () =>
  console.log(`Started server at ${PORT}`)
);
