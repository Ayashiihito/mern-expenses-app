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

  const newExpType = new ExpType({
    user: req.user.id,
    name: req.body.name,
    color: req.body.color,
  });

  const expType = await newExpType.save();
  res.json(expType);
});

//@route DELETE api/exptypes/:id
//@desc delete an expense type from DB
//@access PRIVATE
exptypes.delete('/:id', async (req, res) => {
  try {
    const expType = await ExpType.findById(req.params.id);

    if (expType.user.toString() !== req.user.id) {
      return res.status(401).json({ notauthorized: 'User not authorized' });
    }
    
    await expType.remove();
    res.json({ id: req.params.id });
  } catch {
    res.status(404).json({ notfound: 'No expType found' });
  }
});

module.exports = exptypes;
