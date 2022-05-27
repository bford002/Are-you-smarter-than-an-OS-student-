const router = require('express').Router();
const User = require('../db/models/user.model.js');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/:_id', (req, res) => {
  const _id = req.params._id;
  User.find({ _id: _id })
    .then((results) => {
      if (results.length === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).send(results);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.patch('/:_id', (req, res) => {
  const _id = req.params._id;
  // console.log(req.body);
  User.updateOne({ _id: _id }, req.body)
    .then(() => {
      User.find({ _id: _id }).then((results) => {
        // console.log(results);
        res.status(200).send(results);
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(404)
        .json({ success: false, message: 'Username already exists' });
    });
});
router.delete('/:_id', (req, res) => {
  const _id = req.params._id;
  // console.log(req.body);
  User.deleteOne({ _id: _id })
    .then((results) => {
      // console.log(results);
      res.status(200).send(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ success: false, message: 'User does not exist' });
    });
});

module.exports = router;
