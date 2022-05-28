const path = require('path');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { connection } = require('./db/index');
const cron = require('node-cron');
const passport = require('passport');
require('./auth');
const Question = require('./db/models/questions.model.js');
const User = require('./db/models/user.model.js');

const axios = require('axios');

const app = express();
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET, PUT, POST, PATCH, DELETE',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(CLIENT_PATH));

const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions');
const authRouter = require('./routes/auth');

app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/auth', authRouter);
// 59 59 23
cron.schedule('59 59 23 * * *', () => {
  // console.log(new Date().toLocaleString());
  axios.get('https://opentdb.com/api.php?amount=10').then((results) => {
    // console.log(results.data.results);
    Question.updateOne(
      { name: 'Daily' },
      { questions: results.data.results }
    ).then(() => {
      User.updateMany({ dailyCompleted: true }, { dailyCompleted: false }).then(
        (results) => {
          console.log(results);
        }
      );
    });
  });
});

app.get('/*', function (req, res) {
  res.sendFile(
    path.join(__dirname, '../client/dist/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});
const HOST = '0.0.0.0';

connection
  .then(() => {
    console.log('MongoDB database connection established successfully');
  })
  .then(() => {
    app.listen(PORT, HOST, (err) => {
      if (err) {
        console.error(err);
      }
      console.log('Server listening on PORT', PORT);
    });
  })
  .catch((err) => {
    console.error(err);
  });
