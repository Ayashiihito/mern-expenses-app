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

const PORT = process.env.PORT || 5000;
const ENV = app.get('env');

//DB config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(() => console.log(err));

//Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(compression());

// cors middleware runs only in development
if (ENV !== 'production') {
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
if (ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () =>
  console.log(`Started server at ${PORT}, running in ${ENV} environment`)
);
