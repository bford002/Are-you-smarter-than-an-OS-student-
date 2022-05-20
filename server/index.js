const path = require('path');
const express = require('express');
const app = express();
const PORT = 8080;

const CLIENT_PATH = path.resolve(__dirname, '../client/dist');

app.use(express.json());
app.use(express.static(CLIENT_PATH));


app.listen(PORT, function (err) {
  if (err) { console.log(err); }
  console.log('Server listening on PORT', PORT);
});
