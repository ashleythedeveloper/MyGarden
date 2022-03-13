const express = require('express');
const path = require("path");
const cors = require('cors');
const dotenv = require('dotenv').config();

const siteRoutes = require('./routes/index');

const app = express();

var corsOptions = {
  origin: true,
}

app.use(cors(corsOptions))


app.use(express.static(path.join(__dirname, 'public')));

app.use(siteRoutes);

app.use((req, res, next) => {
  res.status(404).render("404.html", {"urlNotFound": req.url});
});

app.listen(5000);
