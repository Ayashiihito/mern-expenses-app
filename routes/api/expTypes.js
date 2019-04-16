const express = require('express');
const exptypes = express.Router();
const passport = require('passport');

const ExpType = require('../../models/ExpType');

const validateExpTypeInput = require('../../validation/expType.js');

//Make all api/exptypes routes PRIVATE
exptypes.use(passport.authenticate('jwt', { session: false }));

//@route GET api/exptypes
//@desc get a list of all expense types
//@access PRIVATE
exptypes.get('/', async (req, res) => {
  try {
    const types = await ExpType.find({ user: req.user.id });
    res.json(types);
  } catch {
    res.status(404);
  }
});

//@route POST api/exptypes
//@desc save a new to expense type to DB
//@access PRIVATE
exptypes.post('/', async (req, res) => {
  const { errors, isValid } = validateExpTypeInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  // create a new expense type
  const newExpType = new ExpType({
    user: req.user.id,
    name: req.body.name,
    color: req.body.color,
  });
  //Save it to DB and respond with it
  const expType = await newExpType.save();
  res.json(expType);
});

module.exports = exptypes;
