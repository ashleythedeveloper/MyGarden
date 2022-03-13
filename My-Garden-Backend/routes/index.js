var express = require('express');
const dotenv = require('dotenv').config();
var router = express.Router();
const { Pool } = require('pg')


/* GET home page. */
router.get('/', async (req, res, next) => {

  const defultDate = new Date().toISOString()
  console.log(req.query)
  const startDate = req.query.startDate ? req.query.startDate : defultDate.slice(0, 10)
  const endDate = req.query.endDate ? req.query.endDate : defultDate.slice(0, 10)

  const pool = new Pool({
    user: process.env.DATABASEUSERNAME,
    host: process.env.DATABASEHOST,
    database: process.env.DATABASENAME,
    password: process.env.DATABASEPASSWORD,
    port: process.env.DATABASEPORT,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  const listDestructor = (list) => {
    let data = {
      timeList: [],
      tempList: [],
      humidityList: []
    };

    for (item in list){
      const timestamp = new Date(list[item].date_time);
      const localTime = timestamp.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'});
      data.timeList.push(localTime)
      data.tempList.push(list[item].temperature)
      data.humidityList.push(list[item].humidity)
    };
    return data
  };

  let newData
   pool.query(`SELECT * FROM my_garden_records WHERE date_time BETWEEN '${startDate}T00:00:00' AND '${endDate}T23:59:59' ORDER BY id ASC;`, (err, data) => {
   if (err) {
      console.log(err)
   } else {
      newData = listDestructor(data.rows)
      res.send(newData);
   }
  });
  
});

module.exports = router;
