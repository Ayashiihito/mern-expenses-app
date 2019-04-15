const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const compression = require('compression');
const path = require('path');

const expenses = require('./routes/api/expenses');
const expTypes = require('./routes/api/expTypes');
const users = require('./routes/api/auth');

const PORT = 5000;

//DB config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(compression());

// cors middlewere runs only in development
if (process.env.NODE_ENV !== 'production') {
  const cors = require('cors');
  app.use(cors());
}

//Passport Config:
require('./config/passport')(passport);

//Routes:
app.use('/api/expenses', expenses);
app.use('/api/auth', users);
app.use('/api/exptypes', expTypes);

//Serve static files only in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || PORT, () =>
  console.log(
    `Started server at ${PORT}, running in ${app.get('env')} environment`
  )
);
