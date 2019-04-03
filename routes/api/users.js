const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const secret = require('../../config/keys').secret;

//@route GET /api/users
//@desc get a list of all users
//@acess PUBLIC
router.get('/', (req, res) => {
  User.find().then(users => res.json(users));
});

//@route POST /api/users/register
//@desc put a user in DB
//@acess PUBLIC
router.post('/register', (req, res) => {
  const body = req.body;

  User.findOne({ email: body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const avatar = gravatar.url(body.email, {
        s: '200', // Size
        r: 'PG', // Rating
        d: 'mm', // Default
      });

      const newUser = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        avatar,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route POST /api/users/login
//@desc Login user / Return JWT token
//@acess PUBLIC
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) return res.status(404).json({ email: 'User not found' });
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        }; // create JWT payload

        jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
          res.json({ success: true, token: 'Bearer ' + token });
        });
      } else {
        return res.status(400).json({ password: 'Incorect password' });
      }
    });
  });
});

//@route GET /api/users/curent
//@desc return current user
//@acess PRIVATE

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

//@route DELETE /api/users/:id
//@desc delete a user from DB
//@acess PUBLIC

router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false, err }));
});

module.exports = router;
