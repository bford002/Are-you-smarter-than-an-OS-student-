const path = require('path');
const express = require('express');
const cors = require('cors');
const { connection } = require('./db/index');

//console.log(connection);

const app = express();
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const PORT = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());
app.use(express.static(CLIENT_PATH));

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

connection
  .then(()=>{
    console.log('MongoDB database connection established successfully');
  })
  .then(()=>{
    app.listen(PORT, (err) => {
      if (err) { console.log(err); }
      console.log('Server listening on PORT', PORT);
    });
  })
  .catch((err)=>{
    console.error(err);
  });


