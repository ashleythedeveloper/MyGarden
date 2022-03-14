var express = require('express');
var router = express.Router();
const data = require('../controllers/data')


router.get('/', data.RetrieveData);

module.exports = router;
