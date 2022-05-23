const mongoose = require('mongoose');

require('dotenv').config();

const uri = process.env.ATLAS_URI;

const connection = mongoose.connect(uri, { useNewUrlParser: true });

module.exports.connection = connection;

