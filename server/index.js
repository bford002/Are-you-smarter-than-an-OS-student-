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


app.use(cors());
app.use(express.json());
//app.use(express.static(CLIENT_PATH));

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);

};

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});
app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello, ${req.user.name}!`);
});
app.get('/auth/google', 
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
app.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
);
app.get('/auth/failure', (req, res) => {
  res.send('something went wrong');
});
app.get('/logout', (req, res)=>{
  const logUser = req.user.name;
  req.logOut(()=>{
    res.send(`Goodbye, ${logUser}!`);
  });
  //req.session.destroy();
});

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

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


