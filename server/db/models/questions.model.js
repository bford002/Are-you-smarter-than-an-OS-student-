const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  questions: [{}],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
