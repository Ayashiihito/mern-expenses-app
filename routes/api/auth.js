const auth = require('express').Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const secret = require('../../config/keys').secret;
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//@route POST /api/auth/register
//@desc put a user in DB
//@access PUBLIC
auth.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  const { name, email, password } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ email });
  if (user) {
    errors.email = 'User with this email already exists';
    return res.status(400).json(errors);
  } else {
    const avatar = gravatar.url(email, {
      s: '200', // Size
      r: 'PG', // Rating
      d: 'mm', // Default
    });
    const avatarSmall = gravatar.url(email, {
      s: '50', // Size
      r: 'PG', // Rating
      d: 'mm', // Default
    });

    const newUser = new User({
      name,
      email,
      password,
      avatar,
      avatarSmall,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        const user = await newUser.save();
        res.json(user);
      });
    });
  }
});

//@route POST /api/auth/login
//@desc Login user / Return JWT token
//@access PUBLIC
auth.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ email });
  if (!user) {
    errors.email = 'Incorrect email or password';
    return res.status(404).json(errors);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const payload = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      avatarSmall: user.avatarSmall,
    }; // create JWT payload

    const token = await jwt.sign(payload, secret, { expiresIn: 3600 });
    res.json({ success: true, token: 'Bearer ' + token });
  } else {
    errors.email = 'Incorrect email or password';
    return res.status(400).json(errors);
  }
});

/* =========================================================
 FIREBASE AUTH
 ============================================================*/

const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://expenses-app-id.firebaseio.com',
});

auth.post('/firebase', async (req, res) => {
  const { firebaseToken } = req.body;
  const { name, email } = await admin.auth().verifyIdToken(firebaseToken);

  const avatar = gravatar.url(email, {
    s: '200', // Size
    r: 'PG', // Rating
    d: 'mm', // Default
  });
  const avatarSmall = gravatar.url(email, {
    s: '50', // Size
    r: 'PG', // Rating
    d: 'mm', // Default
  });

  let user = await User.findOne({ email });

  if (!user) {
    const newUser = new User({
      name,
      email,
      avatar,
      avatarSmall,
    });
    user = await newUser.save();
  }

  const payload = {
    id: user.id,
    name,
    avatar,
    avatarSmall,
  };

  const newToken = await jwt.sign(payload, secret, { expiresIn: 3600 });
  res.json({ success: true, token: 'Bearer ' + newToken });
});

module.exports = auth;
