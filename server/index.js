const path = require('path');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { connection } = require('./db/index');
const passport = require('passport');
require('./auth');

//console.log(connection);

const app = express();
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const PORT = process.env.PORT || 8080;


app.use(cors({ 
  origin: process.env.CLIENT_URL,
  methods: 'GET, PUT, POST',
  credentials: true
}));
app.use(express.json());
app.use(express.static(CLIENT_PATH));

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
const HOST = '0.0.0.0';

connection
  .then(()=>{
    console.log('MongoDB database connection established successfully');
  })
  .then(()=>{
    app.listen(PORT, HOST, (err) => {
      if (err) { console.log(err); }
      console.log('Server listening on PORT', PORT);
    });
  })
  .catch((err)=>{
    console.error(err);
  });


