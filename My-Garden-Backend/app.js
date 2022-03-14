const express = require('express');
const cors = require('cors');

const routes = require('./routes/index');

const app = express();

var corsOptions = {
  origin: true,
}

app.use(cors(corsOptions))
app.use(routes);

app.listen(5001);
