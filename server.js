const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const expenses = require('./routes/api/expenses');
const expTypes = require('./routes/api/expTypes');
const users = require('./routes/api/users');

const PORT = 5000;

//DB config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

//Passport Config:
require('./config/passport')(passport);

//Routes:
app.use('/api/expenses', expenses);
app.use('/api/users', users);
app.use('/api/exptypes', expTypes);

app.listen(process.env.PORT || PORT, () =>
  console.log(`Started server at ${PORT}`)
);
