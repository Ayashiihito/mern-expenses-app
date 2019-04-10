const router = require('express').Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const secret = require('../../config/keys').secret;
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//@route POST /api/users/register
//@desc put a user in DB
//@acess PUBLIC
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  const { name, email, password } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(email, {
        s: '200', // Size
        r: 'PG', // Rating
        d: 'mm', // Default
      });

      const newUser = new User({
        name,
        email,
        password,
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
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

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
        errors.password = 'Incorect password';
        return res.status(400).json(errors);
      }
    });
  }).catch(err => res.status(404).json(err))
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
