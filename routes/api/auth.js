const auth = require('express').Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const secret = require('../../config/keys').secret;
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//@route POST /api/auth/register
//@desc register a new user and put in DB
auth.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  const { name, email, password } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  //respond with error if user's email is already in DB
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
    name,
    email,
    password,
    avatar,
    avatarSmall,
  });

  //Encrypt newUser's password and respond with user object
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
  // If no user in DB, respond with error
  const user = await User.findOne({ email });
  if (!user) {
    errors.email = 'Incorrect email or password';
    return res.status(404).json(errors);
  }
  // compare request's password with user's password
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    //put user's info into payload
    const { id, name, avatar, avatarSmall } = user;
    const payload = {
      id,
      name,
      avatar,
      avatarSmall,
    };

    //Make a JWT from payload and respond with it
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

//Firebase config
let serviceAccount;
const admin = require('firebase-admin');
if (auth.get('env') === 'production') {
  serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
} else {
  serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://expenses-app-id.firebaseio.com',
});

//@route POST /api/auth/firebase
//@desc Login or register with firebase and return a JWT token
auth.post('/firebase', async (req, res) => {
  try {
    const { firebaseToken } = req.body;
    // verify request's token with firebase API
    const firebaseUser = await admin.auth().verifyIdToken(firebaseToken);
    const { email } = firebaseUser;

    //Find user in DB
    let user = await User.findOne({ email });

    //if there's no user, register a new user
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
        name,
        email,
        avatar,
        avatarSmall,
      });
      user = await newUser.save();
    }
    //put user's info into payload
    const { id, name, avatar, avatarSmall } = user;
    const payload = {
      id,
      name,
      avatar,
      avatarSmall,
    };
    //Make a JWT from payload and respond with it
    const newToken = await jwt.sign(payload, secret, { expiresIn: 3600 });
    res.json({ success: true, token: 'Bearer ' + newToken });
  } catch {
    res.json({ error: 'Something went wrong during authorization' });
  }
});

module.exports = auth;
