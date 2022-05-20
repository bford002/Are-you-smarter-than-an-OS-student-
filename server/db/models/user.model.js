const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
  },
  qAttempted: {
    type: Number,
    default: 0
  },
  qCorrect: {
    type: Number,
    default: 0
  },
  imageURL: {
    type: String
  },
  wins: {
    type: Number,
    default: 0
  },
  totalGames: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
