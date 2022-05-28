const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 1,
    },
    name: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 1,
    },
    qAttempted: {
      type: Number,
      default: 0,
    },
    qCorrect: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default: 'URL HERE',
    },
    wins: {
      type: Number,
      default: 0,
    },
    totalGames: {
      type: Number,
      default: 0,
    },
    dailyCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

module.exports = User;
