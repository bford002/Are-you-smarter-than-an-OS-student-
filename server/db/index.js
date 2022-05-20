const mongoose = require('mongoose');

require('dotenv').config();

const uri = process.env.ATLAS_URI;

// mongoose.connect(uri, { useNewUrlParser: true });

// const connection = mongoose.connection;

const connection = mongoose.connect(uri, { useNewUrlParser: true });

module.exports.connection = connection;

