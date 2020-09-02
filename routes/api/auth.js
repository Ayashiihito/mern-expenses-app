const auth = require('express').Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const secret = require('../../config/keys').secret;
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const firebase = require('../../config/firebase');
/*
 TODO: rate limiting to prevent brute force
*/

//@route POST /api/auth/register
//@desc register a new user and put in DB
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
  }

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
    method: 'local',
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
});

//@route POST /api/auth/login
//@desc Login user and return JWT token
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

  //TODO: refactor to properly distinguish between different strategies
  if (user.method !== 'local') {
    errors.email =
      'Your email is in our database, but under a different method';
    return res.status(404).json(errors);
  }


  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const { id, name, avatar, avatarSmall } = user;
    const payload = {
      id,
      name,
      avatar,
      avatarSmall,
    };

    const token = await jwt.sign(payload, secret, { expiresIn: 3600 });
    res.json({ success: true, token: 'Bearer ' + token });
  } else {
    errors.email = 'Incorrect email or password';
    return res.status(400).json(errors);
  }
});

//@route POST /api/auth/firebase
//@desc Login or register with firebase and return a JWT token
auth.post('/firebase', async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    const firebaseUser = await firebase.auth().verifyIdToken(firebaseToken);
    const { email } = firebaseUser;

    let user = await User.findOne({ email });

    if (!user) {
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
      const { name } = firebaseUser;
      const newUser = new User({
        method: 'google',
        name,
        email,
        avatar,
        avatarSmall,
      });
      user = await newUser.save();
    }

    const { id, name, avatar, avatarSmall } = user;
    const payload = {
      id,
      name,
      avatar,
      avatarSmall,
    };

    const newToken = await jwt.sign(payload, secret, { expiresIn: 3600 });
    res.json({ success: true, token: 'Bearer ' + newToken });
  } catch {
    res.json({ error: 'Something went wrong during authorization' });
  }
});

module.exports = auth;
