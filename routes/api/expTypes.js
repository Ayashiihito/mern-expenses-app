const express = require('express');
const router = express.Router();
const passport = require('passport');

const ExpType = require('../../models/ExpType');

const validateExpTypeInput = require('../../validation/expType.js');

//@route GET api/expTypes
//@desc get a list of all expense types
//@access PRIVATE
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    ExpType.find({ user: req.user.id })
      .then(types => res.json(types))
      .catch(err => res.status(404));
  }
);

//@route POST api/expTypes
//@desc save a new to expense type to DB
//@access PRIVATE
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExpTypeInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const expType = new ExpType({
      user: req.user.id,
      name: req.body.name,
      color: req.body.color,
    });

    expType.save().then(expType => res.json(expType));
  }
);

module.exports = router;
