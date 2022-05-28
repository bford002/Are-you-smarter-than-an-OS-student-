const router = require('express').Router();
const Question = require('../db/models/questions.model.js');

router.route('/').get((req, res) => {
  Question.find({ name: 'Daily' })
    .then((questions) => {
      res.send({
        results: questions[0].questions,
      });
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
